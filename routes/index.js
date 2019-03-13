var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Node App' });
});

router.post('/ville', function(req, res, next) {
  res.render('ville', { nom_ville : req.body.name});
})

module.exports = router;
