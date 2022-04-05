const http = require('http');
const https = require('https')
const fs = require('fs');
const querystring = require('querystring');


const parameters  = {
   secret:"6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"
}

const get_request_args = querystring.stringify(parameters);

const options = {
hostname: "google.com",
path: "/recaptcha/api/siteverify?" + get_request_args,
method: 'GET'
}

console.log(options)

const req = https.request(options, res => {
  console.log("statusCode: ${res.statusCode}")


  res.on('data', d => {
    process.stdout.write(d)
  })
})

req.on('error', error => {
  console.error(error)
})

req.end()

http.createServer(function(request, response) {
  fs.readFile('./index.html', function(error, htmlPage) {
    if (error) {
      response.writeHead(404);
      response.write('An error occured: ', error);
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.write(htmlPage);
    }
    response.end();
  });
}).listen(80);


