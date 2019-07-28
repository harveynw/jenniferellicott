const express = require('express');
const fs = require('fs');
const sharp = require('sharp');

const router = express.Router();

const directory = 'public/images';
if(!fs.existsSync(directory)) {
  fs.mkdirSync(directory);
}

Array.prototype.move = function(from,to){
  this.splice(to,0,this.splice(from,1)[0]);
  return this;
};


module.exports = function(store) {
  var manager = {}

  manager.getImages = function() {
    return store.get('images');
  }

  manager.deleteImage = function(name) {
    let images = manager.getImages();
    let image = images.find(i => i.name === name);

    try {
      fs.unlinkSync(directory + '/' + image.filename);
    } catch(error) {
      console.error(error);
    }

    store.set('images', images.filter(i => i.name != name));
  }

  manager.shiftUpImage = function(name) {
    let images = manager.getImages();

    let currentIndex = images.findIndex( i => i.name === name);
    let desiredIndex = currentIndex - 1;
    if(desiredIndex < 0) {
      desiredIndex = images.length - 1;
    }

    images.move(currentIndex, desiredIndex);
    store.set('images', images);
  }

  manager.addImage = function(name, filename) {
    let images = store.get('images');
    let newImage = {
      name: name,
      filename: filename,
      width: 100,
      height: 100
    }
    images.push(newImage);
    store.set('images', images);

    sharp(directory + '/' + filename)
      .metadata()
      .then(md => {
        let currentImages = store.get('images');
        let index = currentImages.findIndex(i => i.name === name);

        if(index > -1) {
          currentImages[index].width = md.width;
          currentImages[index].height = md.height;

          store.set('images', currentImages);
        }
      })
  }

  manager.generateFileDetails = function (req, res, next) {
    req.manager = {};
    req.manager.filename = makeFileName();
    req.manager.destination = directory;
    next();
  }

  return manager;
}

function makeFileName() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text + '.jpg';
}
