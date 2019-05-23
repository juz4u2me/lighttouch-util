var express = require('express');
var router = express.Router();
const proj4 = require('proj4');

proj4.defs([  
  ["EPSG:3414",
  "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +units=m +no_defs"]  
]);

const epsg3414 = new proj4.Proj("EPSG:3414");
const epsg4326 = new proj4.Proj("EPSG:4326");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/convert/4326to3414', (req, res) => {
  var lat = parseFloat(req.query.lat);
  var lng = parseFloat(req.query.lng);
  // Source coordinates will be in Longitude/Latitude
  var point = proj4(epsg3414,[lng,lat]);
  res.send(point);
});

router.get('/convert/3414to4326', (req, res) => {
  var x = parseFloat(req.query.x);
  var y = parseFloat(req.query.y);
  // Source coordinates will be in x/y
  var point = proj4(epsg3414,epsg4326,[x,y]);
  res.send(point);
});

router.post('/convert/4326to3414', (req, res) => {
  var body = req.body;
  var points = [];
  for(var i=0; i<body.length; i++) {    
    // Source coordinates will be in Longitude/Latitude
    var point = proj4(epsg3414,body[i]);
    points.push(point);
  }
  res.send(points);
});

router.post('/convert/3414to4326', (req, res) => {
  var body = req.body;
  var points = [];  
  for(var i=0; i<body.length; i++) {
    // Source coordinates will be in x/y
    var point = proj4(epsg3414,epsg4326,body[i]);
    points.push(point);
  }
  res.send(points);
});

module.exports = router;
