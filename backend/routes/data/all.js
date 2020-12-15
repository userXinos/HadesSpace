import {existsSync} from 'fs';
import getByPath from '../../modules/getByPath.js';

export default async function routes(fastify) {
  fastify.get('/*', async (request, reply) => {
    const args = request.params['*'].split('/');
    let data;

    if (existsSync('../../generateGameData/data/' + args[0] + '.js')) {
      data = await import('../../../generateGameData/data/' + args.shift() + '.js')
          .catch(() => {
            throw fastify.httpErrors.internalServerError('File import error');
          });
    } else {
      throw fastify.httpErrors.badRequest('Path not found');
    }

    let category = 'data';
    if (args[0] != undefined && args[0].toLowerCase() == 'bytypes') {
      category = 'byTypes';
      args.shift();
    }

    const result = getByPath(data[category], args);
    if (!result) {
      throw fastify.httpErrors.badRequest('Path not found');
    } else {
      reply.send(result);
    }
  });
}
