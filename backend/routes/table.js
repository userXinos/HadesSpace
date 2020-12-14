import Pageres from 'pageres';
import {readFile} from 'fs/promises';
import {default as renderHtml} from '../images/table/index.js';

export default async function routes(fastify) {
  fastify.get('/table.png', (request, reply) => {
    const theme = request.query.theme || 'dark';
    const lang = request.query.lang || 'en';
    const path = request.query.path.split('.');

    Promise.all([
      import('../../generateGameData/data/' + path[0] + '.js'),
      import('../../generateGameData/data/loc_strings/' + lang + '.js'),
      readFile('./images/table/index.html', 'utf-8'),
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

          new Pageres({
            css: files[3],
          })
              .src(`data:text/html,${html}`, ['1228x431'])
              .run()
              .then((img) => {
                reply.type('image/png').send(img[0]);
              });
        })
        .catch((err) => {
          throw err;
        });
  });
};

