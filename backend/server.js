'use strict';
const fastify = require('fastify')({
  logger: {
    level: 'info',
    prettyPrint: {
      translateTime: 'HH:MM:ss | yyyy.mm.dd o',
    },
    redact: ['req.headers.authorization'],
    serializers: {
      req(request) {
        return {
          method: request.method,
          headers: request.headers,
          remoteAddress: request.ip,
        };
      },
    },
  },
});
const autoLoad = require('fastify-autoload');
const path = require('path');

fastify.register(require('fastify-sensible')); // плагин HTTP ошибок
fastify.register(autoLoad, {
  dir: path.join(__dirname, 'routes'),
  options: {prefix: '/api'},
});

fastify.listen(3000, (err, address) => {
  fastify.log.info('\n' + fastify.printRoutes());
  if (err) throw err;
});
