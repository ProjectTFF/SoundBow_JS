var express = require('express');
var router = express.Router();
var path = require("path");
var formidable = require('formidable');
var fs = require('fs');
const { stringify } = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // res.send('moroo');
  // res.sendFile(path.join(__dirname +'../public/upload'), { title: 'Express' });
  res.sendFile('public/upload.html', { root: '.' });
});

router.get('/reset_sounds', function(req, res, next) {
  
})

router.post('/fileupload', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {

    // If sound is not in .wav-format, throw error
    try {
      var old_filename = files.filetoupload.originalFilename;
      var file_ending = old_filename.substr(old_filename.length - 4);
      if (file_ending != ".wav") {
        throw 'Wrong filetype';
      }
    }
    catch(e) {
      res.write("Things went wrong. Error: " + e);
      res.end()
      return;
    }
    // Upload the new file from somewhere to the sound folder
    var oldpath = files.filetoupload.filepath;
    var new_filename = fields.storeplace
    var newpath = path.join(__dirname, '../assets/sounds/', new_filename);
    console.log("uusi polku olisi " + newpath);
    fs.rename(oldpath, newpath, function(err) {
      if (err) {
        console.log(err);
        throw err;
      }
      else {
        res.write('File updated!');
        res.end();
      }
      
    })
  })
})

module.exports = router;
