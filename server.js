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
      objToJson = {
        dog: 'Greyhound',
        pic: 'https://media.istockphoto.com/photos/portrait-of-a-little-white-italian-greyhound-sitting-among-green-picture-id1307782330?b=1&k=20&m=1307782330&s=170667a&w=0&h=E_Ie23iyeT64k5aDvXWNS5YvGkkMefkuta2bC8hn9Ls='
      }      
    } else if (children && physicallyActive && !bigDogs) {
      objToJson = {
        dog: 'Shih Tzu',
        pic: 'https://media.istockphoto.com/photos/shih-tzu-in-nature-picture-id515783902?b=1&k=20&m=515783902&s=170667a&w=0&h=VhIRQGqHff_KKXtRsg6A5gig0TUJ6lNEPHIeOMc114o='
      }
    } else if (children && !physicallyActive && !bigDogs) {
      objToJson = {
        dog: 'Maltese',
        pic: 'https://media.istockphoto.com/photos/dog-running-picture-id824883238?b=1&k=20&m=824883238&s=170667a&w=0&h=T5rLzwG6qOV6oSG00MmL12VgE5nDE2J49fVJTpP1jMc='
      }
    } else if (children && !physicallyActive && bigDogs) {
      objToJson = {
        dog: 'Saint Bernard',
        pic: 'https://media.istockphoto.com/photos/dog-picture-id1208414454?b=1&k=20&m=1208414454&s=170667a&w=0&h=k_WOOJiM0P6KnGCG0nJssUUitiin6wPAowPVXwSRtp8='
      }
    } else if (!children && !physicallyActive && !bigDogs) {
      objToJson = {
        dog: 'Yorkshire Terrior',
        pic: 'https://media.istockphoto.com/photos/yorkshire-terrier-dog-on-white-background-picture-id1318666271?b=1&k=20&m=1318666271&s=170667a&w=0&h=214u7cZGlcRiyVfJXC-vJn6l9kAzLApqRp0nvbhRJ14='
      }
    } else if (!children && !physicallyActive && bigDogs) {
      objToJson = {
        dog: 'Rottweiler',
        pic: 'https://media.istockphoto.com/photos/rottweilers-couple-picture-id94921178?b=1&k=20&m=94921178&s=170667a&w=0&h=Cl9gzwWSMA1NncExvZALxgAU7bGSWHbPNW9pLJc9KBQ='
      }
    } else if (!children && physicallyActive && bigDogs) {
      objToJson = {
        dog: 'Pitbull',
        pic: 'https://media.istockphoto.com/photos/big-dog-picture-id513392620?b=1&k=20&m=513392620&s=170667a&w=0&h=JlFAgxko0-DWQYKNC4CKgkBO3GSvKMYD8oeKTbnHIlM='
      }
    } else if (!children && physicallyActive && !bigDogs) {
      objToJson = {
        dog: 'Chihuahua',
        pic: 'https://media.istockphoto.com/photos/elderly-chihuahua-dog-standing-in-a-soft-den-picture-id1305734520?b=1&k=20&m=1305734520&s=170667a&w=0&h=38bu9dX5vGez8RM9kjcKAIJuSmlDOB3BgtwB9fDDbz4='
      }
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

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
