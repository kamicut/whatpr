const sqlite = require('spatialite');
const db = new sqlite.Database('./pathrows.db');

class DBError extends Error {}
class InvalidArgument extends Error {}

function queryDB(query) {
  return new Promise((resolve, reject) => {
    db.spatialite(err => {
      if (err) reject(DBError(err));
      db.all(query, (err, rows) => {
        if (err) reject(DBError(err));
        else resolve(rows);
      });
    });
  });
}

async function whichpathrow(geometry) {
  /* 
  Validate arguments 
  TODO: Should we validate the geometry?
  */
  if (!(geometry instanceof String)) {
    try {
      geometry = JSON.stringify(geometry);
    }
    catch (err) {
      console.error(err);
      throw new InvalidArgument(err);
    }
  }

  const query = `SELECT PATH,ROW,AsGeoJSON(geometry) as GEOM from pathrows where Intersects(GeomFromGeoJSON('${geometry}'), pathrows.geometry);`

  try {
    const rows = await queryDB(query);
    const features = rows.map(row => ({
      type: 'Feature',
      properties: { path: row.PATH, row: row.ROW },
      geometry: row.GEOM
    }));
    return {
      type: 'FeatureCollection',
      features
    };
  } catch (err) {
    console.error(err)
    throw new DBError(err);
  }
}

module.exports = whichpathrow;