const { test } = require('ava');
const whatpr = require('.');

const GEOM = {"type":"Polygon","coordinates":[[[-119.49075,38.90475],[-122.39589,38.30397],[-121.58167,36.0251],[-118.75856,36.60807],[-119.49075,38.90475]]]};

test('correct response', async t => {
  const fc = await whatpr(GEOM);
  t.is(fc.features.length, 11);
})