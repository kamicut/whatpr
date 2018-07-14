const { test } = require('ava');
const {intersects, getGeom} = require('.');

const tileBoundaryGeom = {"type":"Polygon","coordinates":[[[-119.49075,38.90475],[-122.39589,38.30397],[-121.58167,36.0251],[-118.75856,36.60807],[-119.49075,38.90475]]]};
const pathRowGeom = {
  type: 'Feature',
  properties: {
    PATH: 42,
    ROW: 35
  },
  geometry: {"type":"MultiPolygon","coordinates":[[[[-120.6881873931192,35.43618190600653],[-120.6889999999999,35.4363],[-120.2907264026009,36.87056021745927],[-120.2791506955027,36.91224657650555],[-120.2699999999999,36.9452],[-120.2697837191817,36.94516855062426],[-118.233,36.649],[-118.239330761813,36.62808065849252],[-118.6843356030867,35.15760861705306],[-118.688,35.14549999999999],[-120.6881873931192,35.43618190600653]]]]}
};

test('intersects', async t => {
  const fc = await intersects(tileBoundaryGeom);
  t.is(fc.features.length, 11);
});

test('getGeom', async t => {
  const f = await getGeom(42, 35);
  t.deepEqual(f, pathRowGeom);
})