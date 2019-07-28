var express = require('express');
var router = express.Router();

module.exports = function (manager) {
    const router = express.Router();

    router.get('/', function(req, res, next) {
      res.send({
        images: manager.getImages()
      })
    });

    return router;
}
