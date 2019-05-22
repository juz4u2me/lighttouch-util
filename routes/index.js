var express = require('express');
var router = express.Router();
const proj4 = require('proj4');

proj4.defs([  
  ["EPSG:3414",
  "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs"]  
]);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/convert/4326to3414', (req, res) => {
  var lat = parseFloat(req.query.lat);
  var lng = parseFloat(req.query.lng);
  var dst = new proj4.Proj("EPSG:3414");
  // Source coordinates will be in Longitude/Latitude
  var point = proj4(dst,[lng,lat]);
  res.send(point);
});

router.get('/convert/3414to4326', (req, res) => {
  var x = parseFloat(req.query.x);
  var y = parseFloat(req.query.y);
  // Source coordinates will be in x/y
  var src = new proj4.Proj("EPSG:3414");
  var dst = new proj4.Proj("EPSG:4326");
  var point = proj4(src,dst,[x,y]);
  res.send(point);
});

module.exports = router;
