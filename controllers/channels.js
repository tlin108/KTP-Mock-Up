var express = require('express');
var router = express.Router();

/* GET channel listing. */
router.get('/', function(req, res, next) {
  res.render('channels');
});

module.exports = router;
