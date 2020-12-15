import {readFile} from 'fs/promises';
import renderHtml from '../images/table/index.js';
import getByPath from '../modules/getByPath.js';
import nodeHtmlToImage from 'node-html-to-image';

export default async function routes(fastify) {
  fastify.get('/table.png', async (request, reply) => {
    const theme = request.query.theme || 'dark';
    const lang = request.query.lang || 'en';
    const path = request.query.path.split('.');
    const file = path.shift();

    const imports = await Promise.all([
      import('../../generateGameData/data/' + file + '.js')
          .catch((err) => {
            if (err.code == 'ERR_MODULE_NOT_FOUND') {
              reply.badRequest('File not found');
            }
          }),
      import('../../generateGameData/data/loc_strings/' + lang + '.js')
          .catch((err) => {
            if (err.code == 'ERR_MODULE_NOT_FOUND') {
              reply.badRequest('Invalid or unsupported language');
            }
          }),
      readFile('./images/table/template.html', 'utf-8'),
      readFile('./images/table/style.css', 'utf-8'),
    ]).catch((err) => {
      request.log.error(err);
      throw fastify.httpErrors.internalServerError('File import error');
    });


    const obj = getByPath(imports[0].data, path);

    if (obj == null) {
      throw fastify.httpErrors.badRequest('Path not found in file');
    }
    if (obj.constructor !== Object && obj.maxLevel && obj.maxLevel > 1) {
      throw fastify.httpErrors.badRequest('This path cannot be displayed as a table');
    }
    const html = renderHtml(
        imports[2],
        {
          raw: obj,
          locStrings: imports[1].data,
          tableName: path.pop(),
        },
        {theme},
    );
    const style = '<style>' + imports[3] + '</style>';

    return nodeHtmlToImage({
      html: html + style,
    })
        .then((img) => {
          return reply.type('image/png').send(img);
        })
        .catch((err) => {
          request.log.error(err);
          throw fastify.httpErrors.internalServerError('Image rendering error');
        });
  });
};

