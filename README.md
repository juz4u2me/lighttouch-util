# lighttouch-util

## Description
Conversion utility for coordinate systems EPSG:4326 to EPSG:3414 and vice versa

## Usage
```
GET
curl http://localhost:<port_exposed>/convert/4326to3414?lat=<latitude>&lng=<longitude>
curl http://localhost:<port_exposed>/convert/3414to4326?x=<x>&y=<y>
```
```
POST
To: http://localhost:<port_exposed>/convert/4326to3414
Content-Type: application/json
Body: [
        [<longitude>, <latitude>], 
        [<longitude>, <latitude>], 
        [<longitude>, <latitude>]
      ]
```
