const sqlite = require('spatialite');

class DBError extends Error {}
class InvalidArgument extends Error {}

function queryDB(query) {
  const db = new sqlite.Database('./pathrows.db');
  return new Promise((resolve, reject) => {
    db.spatialite(err => {
      if (err) reject(new DBError(err));
      db.all(query, (err, rows) => {
        if (err) reject(new DBError(err));
        else resolve(rows);
      });
    });
  });
}

function mapRowToFeature(row) {
  if (!row.GEOM) throw new Error('geometry must exist');
  let properties = {};
  for (k in row) {
    if (k !== 'GEOM') {
      properties[k] = row[k];
    }
  }

  return {
    type: 'Feature',
    properties,
    geometry: JSON.parse(row.GEOM)
  };
}

async function intersects(geometry) {
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
    const features = rows.map(mapRowToFeature);
    return {
      type: 'FeatureCollection',
      features
    };
  } catch (err) {
    console.error(err)
    throw new DBError(err);
  }
}

async function getGeom(path, row) {
  const query = `SELECT PATH,ROW,AsGeoJSON(geometry) as GEOM from pathrows where PATH=${path} and ROW=${row}`;
  try {
    const rows = await queryDB(query);
    const features = rows.map(mapRowToFeature);
    return features[0];

  } catch (err) {
    console.error(err)
    throw new DBError(err);
  }
}

module.exports = {
  intersects,
  getGeom
};