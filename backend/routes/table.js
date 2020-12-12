const Pageres = require('pageres');
const fs = require('fs');
const baseHtml = fs.readFileSync('./images/table/index.html', 'utf-8');
const renderHtml = require('../images/table/index.js');

module.exports = async function routes(fastify) {
  fastify.get('/table.png', (request, reply) => {
    const path = request.query.path.split('.');
    import('../../generateGameData/data/' + path[0] + '.js')
        .then((file) => {
          const html = renderHtml(baseHtml, file.data[path[1]]);

          new Pageres()
              .src(`data:text/html,${html}`, ['1024x768'])
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

