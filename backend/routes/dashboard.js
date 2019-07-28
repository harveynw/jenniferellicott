const express = require('express');
const session = require('express-session');
const crypto = require('crypto');
const multer = require('multer');
const fs = require('fs');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, req.manager.destination);
  },
  filename: function (req, file, cb) {
    cb(null, req.manager.filename)
  }
})

let upload = multer({
   storage: storage,
   fileFilter: function fileFilter (req, file, cb) {
     if(req.session.logged_in) {
       cb(null, true);
     } else {
       cb(null, false);
     }
   }
 });

const config = require('../config');

module.exports = function (manager) {
    const router = express.Router();

    /* GET dashboard */
    router.get('/', function(req, res, next) {
      if(req.session.logged_in) {
        res.render('dashboard', {
           images: manager.getImages(),
           msg: req.query.msg,
           err: req.query.err==='true'
        });
      } else {
        res.render('login', { err: req.query.err});
      }
    });

    /* POST login */
    router.post('/', function(req, res, next) {
      if(req.body.keyword && req.body.password) {
        if(verify(req.body.keyword, req.body.password)) {
          req.session.logged_in = true;
          res.redirect('/dashboard');
          return;
        }
      }
      res.redirect('?err=Incorrect');
    });

    /* POST new image */
    router.post('/image', manager.generateFileDetails, upload.single('new_image'), function(req, res, next) {
      if(req.session.logged_in) {
        manager.addImage(req.body.name, req.manager.filename);

        let msg = encodeURI('Added ' + req.body.name);
        res.redirect('/dashboard' + '?msg=' + msg);

        return;
      }

      res.redirect('/dashboard');
    });

    /* POST mutate images */
    router.post('/mutate', function( req, res, next ) {
      let msg = '';
      if(req.session.logged_in) {
        let imageContext = req.body.name;
        switch(req.body.operation) {
          case 'delete':
            manager.deleteImage(imageContext);
            msg = imageContext + ' deleted';
            break;
          case 'shift':
            manager.shiftUpImage(imageContext);
            break;
          default:
            break;
        }
      }
      res.redirect('/dashboard?msg=' + encodeURI(msg));
    });

    /* GET logout request */
    router.get('/logout', function(req, res, next) {
      req.session.logged_in = false;
      res.redirect('/dashboard');
    });

    return router;
};

function verify(keyword, password) {
  const key = crypto.pbkdf2Sync(password, keyword, 100000, 64, 'sha512');
  return process.env.PASSWORD_ENCRYPTED === key.toString('hex');
}
