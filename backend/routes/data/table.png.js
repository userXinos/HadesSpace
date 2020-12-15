import {readFile} from 'fs/promises';
import renderHtml from '../../images/table/index.js';
import nodeHtmlToImage from 'node-html-to-image';
import getByPath from '../../modules/getByPath.js';

export default async function routes(fastify) {
  fastify.get('/:file/table.png', table);
  fastify.get('/:file/:id/table.png', table);

  async function table(request, reply) {
    const theme = request.query.theme || 'dark';
    const lang = request.query.lang || 'en';
    const id = (request.params.id) ? request.params.id : null;

    const imports = await Promise.all([
      import('../../../generateGameData/data/' + request.params.file + '.js')
          .catch((err) => {
            if (err.code == 'ERR_MODULE_NOT_FOUND') {
              reply.badRequest('File not found');
            }
          }),
      import('../../../generateGameData/data/loc_strings/' + lang + '.js')
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

    const obj = (id) ? getByPath(imports[0].data, [id]) : imports[0].data;

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
          tableName: id,
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
  }
}
