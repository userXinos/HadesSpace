import {fastify as app} from 'fastify';
import autoLoad from 'fastify-autoload';
import {dirname, join} from 'path';
import {fileURLToPath} from 'url';
import {default as httpErrors} from 'fastify-sensible';

const fastify = app({
  logger: {
    level: 'info',
    prettyPrint: {
      translateTime: 'HH:MM:ss | yyyy.mm.dd o',
    },
    redact: ['req.headers.authorization'],
    serializers: {
      // req(request) {
      //   return {
      //     method: request.method,
      //     headers: request.headers,
      //     remoteAddress: request.ip,
      //   };
      // },
      req(request) {
        return `method: ${request.method} | remoteAddress: ${request.ip}`;
      },
      res(reply) {
        return `statusCode: ${reply.statusCode}`;
      },
    },
  },
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

fastify.register(httpErrors);
fastify.register(autoLoad, {
  dir: join(__dirname, 'routes'),
  options: {prefix: '/api'},
});

fastify.listen(3000, (err, address) => {
  fastify.log.info('\n' + fastify.printRoutes());
  if (err) throw err;
});
