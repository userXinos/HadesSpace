import {existsSync} from 'fs';
import getByPath from '../../modules/getByPath.js';

export default async function routes(fastify) {
  fastify.get('/loc_strings/*', async (request, reply) => {
    const args = request.params['*'].split('/');
    let data;

    if (existsSync('../../generateGameData/data/loc_strings/' + args[0] + '.js')) {
      data = await import('../../../generateGameData/data/loc_strings/' + args.shift() + '.js')
          .catch(() => {
            throw fastify.httpErrors.internalServerError('File import error');
          });
    } else {
      throw fastify.httpErrors.badRequest('Path not found');
    }
    const result = getByPath(data, args);
    if (!result) {
      throw fastify.httpErrors.badRequest('Path not found');
    } else {
      reply.send(result);
    }
  });
}
