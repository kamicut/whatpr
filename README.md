whatpr
=======

❓ what path rows do i get for this polygon ❓

```
wget https://landsat.usgs.gov/sites/default/files/documents/wrs2_descending.zip
unzip wrs2_descending.zip
cd wrs2_descending
spatialite pathrows.db
```

Load the data into the spatialite database
```
.loadshp wrs2_descending pathrows UTF-8
```

Test it: Return all the geometries for a GeoJSON polygon
```
SELECT PATH,ROW from pathrows where Intersects(GeomFromGeoJSON('{"type":"Polygon","coordinates":[[[-119.49075,38.90475],[-122.39589,38.30397],[-121.58167,36.0251],[-118.75856,36.60807],[-119.49075,38.90475]]]}'), pathrows.geometry);
```
