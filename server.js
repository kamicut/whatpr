const fastify = require('fastify')({logger: true});
const helmet = require('fastify-helmet');
const boom = require('boom')

const {intersects, getGeom}= require('.');
const PORT = process.env.PORT || 8084;

fastify.register(require('fastify-swagger'), {
  mode: 'static',
  specification: {
    path: './server-docs.yaml'
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  exposeRoute: true
});

fastify.register(helmet);
fastify.register(require('fastify-boom'));

const pathrowopts = {
  schema: {
    description: 'Get geometry for path row',
    params: {
      type: 'object',
      properties: {
        path: {
          type: 'number',
          description: 'WRS2 Path'
        },
        row: {
          type: 'number',
          description: 'WRS2 Row'
        }
      }
    },
  }
}
fastify.get('/:path/:row', pathrowopts, async (req, res) => {
  const {path, row} = req.params;
  const feature = await getGeom(path, row);
  return feature;
});

const intersectopts = {
  schema: {
    description: 'Get path rows intersecting GeoJSON',
   },
   body: {
     type: 'object'
   }
}
fastify.post('/intersects', intersectopts, async (req, res) => {
  const { body } = req;
  if (!body) {
    throw boom.badRequest('No geojson provided')
  }
  const fc = intersects(body);
  return fc;
});


const start = async () => {
  try {
    await fastify.listen(PORT);
  }
  catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();