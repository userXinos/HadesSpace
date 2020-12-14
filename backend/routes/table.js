const PageRes = require('pageres');
const fs = require('fs/promises');
const renderHtml = require('../images/table/index');

module.exports = async function routes(fastify) {
  fastify.get('/table.png', (request, reply) => {
    const theme = request.query.theme || 'dark';
    const lang = request.query.lang || 'en';
    const path = request.query.path.split('.');

    Promise.all([
      import('../../generateGameData/data/' + path[0] + '.js'),
      fs.readFile('./images/table/index.html', 'utf-8'),
      fs.readFile('./images/table/style.css', 'utf-8'),
    ])
        .then((values) => {
          const html = renderHtml(
              values[1],
              values[0].data[path[1]],
              {theme, lang},
          );

          new PageRes({
            css: values[2],
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

