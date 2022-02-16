var express = require('express');
var router = express.Router();
var path = require("path");
var formidable = require('formidable');
var fs = require('fs');

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

router.post('/fileupload', function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {

    // Upload the new file from somewhere to the sound folder
    var oldpath = files.filetoupload.filepath;
    var newpath = path.join(__dirname, '../assets/sounds', files.filetoupload.originalFilename);
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.write('jotain tapahtui???');
      res.end();
    })
  })
})

module.exports = router;
