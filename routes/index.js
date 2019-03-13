var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});

router.post('/ville', function(req, res, next) {
  var te;
  var msg;
  var long;
  var lat;
  var ville;
  var desc;
  request(`https://geocode.xyz/${req.body.name}?json=1&auth=375272267982458272384x1967`, function (error, response, body) {
    te = JSON.parse(body);// Print the HTML for the Google homepage.
    if(te.latt == "0.00000" && te.latt == "0.00000"){
      ville = 'Non existant';
      desc = 'Ville non existante';
      msg = 'none';
      long = 'NaN';
      lat = 'NaN';
    } else {
      msg = 'block'
      long = te.longt;
      lat = te.latt;
      ville = req.body.name;
      desc = req.body.description;
    }

    res.render('ville', { nom_ville : ville, description : desc, long : long, lat : lat, msg : msg});
  });
})

module.exports = router;
