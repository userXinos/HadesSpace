import {readFile} from 'fs/promises';
import {default as renderHtml} from '../images/table/index.js';
import nodeHtmlToImage from 'node-html-to-image';

export default async function routes(fastify) {
  fastify.get('/table.png', (request, reply) => {
    const theme = request.query.theme || 'dark';
    const lang = request.query.lang || 'en';
    const path = request.query.path.split('.');

    Promise.all([
      import('../../generateGameData/data/' + path[0] + '.js'),
      import('../../generateGameData/data/loc_strings/' + lang + '.js'),
      readFile('./images/table/template.html', 'utf-8'),
      readFile('./images/table/style.css', 'utf-8'),
    ])
        .then((files) => {
          const html = renderHtml(
              files[2],
              {
                raw: files[0].data[path[1]],
                locStrings: files[1].data,
                tableName: path[1],
              },
              {theme},
          );
          const style = '<style>' + files[3] + '</style>';

          nodeHtmlToImage({
            html: html + style,
          })
              .then((img) => {
                reply.type('image/png').send(img);
              });
        })
        .catch((err) => {
          throw err;
        });
  });
};

