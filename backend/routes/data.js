'use strict';
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', '..', 'data/');

module.exports = async function routes(fastify) {
  let file;

  fastify.get('data/*', async (request, reply) => {
    const args = request.params['*'].split('/');
    let path = 'data';
    const err = () => reply.notFound('path not found');

    if (args) {
      try {
        file = require(dataPath + args.shift());
      } catch (e) {
        return err();
      }
    }
    if (args[0] != undefined && args[0].toLowerCase() == 'bytypes') {
      path = 'byTypes';
      args.shift();
    }
    const data = getByPath(file[path], args);
    if (!data) return err();
    reply.send(data);
  });
  fastify.get('data/locstrings/*', async (request, reply) => {
    const args = request.params['*'].split('/');
    const err = () => reply.notFound('path not found');

    if (args) {
      try {
        file = JSON.parse(fs.readFileSync(dataPath +'loc_strings/' + args.shift() + '.json', 'utf8'));
      } catch (e) {
        return err();
      }
    }
    const data = getByPath(file, args);
    if (!data) return err();
    reply.send(data);
  });
};
function getByPath(obj, arr) {
  if (arr[arr.length - 1] === '') arr.pop();
  for (let i = 0, n = arr.length; i < n; ++i) {
    let key = arr[i];

    if (key in obj) {
      obj = obj[key];
    } else { // игнор регистра ключа-аргумента
      key = Object.keys(obj)
          .find((k) => k.toLowerCase() === key.toLowerCase());
      if (key) {
        obj = obj[key];
      } else {
        return;
      }
    }
  }
  return obj;
}
