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
  res.sendFile('public/upload.html', { root: '.' });
});

router.get('/reset_sounds', function(req, res, next) {
  try {
    const target_directory = path.join(__dirname, '../assets/sounds');
    const source_directory = path.join(__dirname, '../assets/sounds_original');

    // Delete files from sounds
    fs.readdir(target_directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(target_directory, file), err => {
          if (err) throw err;
        })
      }
    })

    // Copy original files from sounds_original to sounds
    fs.readdir(source_directory, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.copyFile(path.join(source_directory, file), path.join(target_directory, file), err => {
          if (err) throw err;
        });
      }
    })

    res.send('Sound files have been reset.')
  }
  catch(err) {
    console.log(err);
    throw err;
  }


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
