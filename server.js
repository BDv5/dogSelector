const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  function readWrite (file, contentType) {
    fs.readFile(file, function(err, data) {
      res.writeHead(200, {'Content-Type': contentType})
      res.write(data)
      res.end()
    })
  }

  if (page == '/') {
    readWrite('index.html', 'text/html')
  }
  else if (page == '/api') {

    function extractBoolean (queryParamater) {
      if (queryParamater == 'true') {
        return true
      } else {
        return false
      }
    }

    const children = extractBoolean(params['children'])
    const physicallyActive = extractBoolean(params['physicallyActive'])
    const bigDogs = extractBoolean(params['bigDogs'])
    let objToJson;

    if (children && physicallyActive && bigDogs) {
      objToJson = 'Greyhound'
    } else if (children && physicallyActive && !bigDogs) {
      objToJson = 'Shih Tzu'
    } else if (children && !physicallyActive && !bigDogs) {
      objToJson = 'Chihuahua'
    } else if (children && !physicallyActive && bigDogs) {
      objToJson = 'Pitbull'
    } else if (!children && !physicallyActive && !bigDogs) {
      objToJson = 'Yorkshire Terrior'
    } else if (!children && !physicallyActive && bigDogs) {
      objToJson = 'Rottweiler'
    } else if (!children && physicallyActive && bigDogs) {
      objToJson = 'Saint Bernard'
    } else if (!children && physicallyActive && !bigDogs) {
      objToJson = 'Maltese'
    } else {
      objToJson = 'you\'re too picky'
    }

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(objToJson)) 
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    readWrite('js/main.js', 'text/javascript')
  }else{
    figlet('404!!', function(err, data) {
      if (err) {
          console.dir(err);
          return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
