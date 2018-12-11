const express = require('express');
const hbs = require ('hbs');
const fs = require('fs');

const port = process.eventNames.PORT || 3000;
var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.use((req, res, next) => {
  var now = new Date().toDateString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log("unable to append to log")
    }
  });
  next();
});

app.get('/', (req, res) => {
  // res.send('<h1>hello Express!</h1>');
  res.send({
    name: 'andrew',

  });
});



app.get('/about', (req, res) => {
  res.render('about.hbs',  {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
