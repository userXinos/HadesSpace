const Bundler = require('parcel-bundler');

const file = './frontend/src/pages/*.html'; // Путь к файлу точки входа
const pathSave = (process.argv[2] == undefined) ? './dist' : process.argv[2];
const watch = false;

const options = {
  outDir: pathSave, // Каталог для файлов сборки, по умолчанию - dist
  outFile: 'index.html', // Имя выходного файла
  publicUrl: '.', // Путь, который обслуживает сервер, по умолчанию - '/'
  watch: watch, // следует ли отслеживать изменения файлов и пересобирать их при изменении, по умолчанию - process.env.NODE_ENV !== 'production'
  cache: false, // Включает или отключает кеширование, по умолчанию - true
  cacheDir: '.cache', // Каталог кеширования, по умолчанию .cache
  minify: !watch, // Минизировать файлы, включено если process.env.NODE_ENV === 'production'
  target: 'browser', // browser/node/electron, по умолчанию - browser
  https: false, // Использовать защищённое соединение (https) для файлов, по умолчанию - false
  logLevel: 3, // 3 = логировать всё, 2 = логировать предупреждения и ошибки, 1 = логировать ошибки
  hmrPort: 0, // Порт на котором работает сокет hmr, по умолчанию - случайный свободный порт (0 в node.js определяет случайный свободный порт)
  sourceMaps: true, // Включить или отключить sourcemaps, по умолчанию включено (пока ещё не поддерживается в минифицированных сборках)
  hmrHostname: '', // Имя хоста для модуля горячей перезагрузки, по умолчанию - ''
  detailedReport: true, // Распечатывает подробный отчёт о бандлах, ресурсах, размерах файлов и времени, по умолчанию - false, отчёты распечатываются, если watch отключен
};

async function build() {
  let buildEnd; let bundled;
  const bundler = new Bundler(file, options); // Инициализует упаковщик, используя местоположение точки входа и предоставленные опции

  bundler.on('buildEnd', () => {
    buildEnd = true;
  });
  bundler.on('bundled', () => { // упаковщик содержит все ресурсы и бандлы, подробности смотрите в документации
    bundled = true;
  });
  await bundler.bundle()
      .catch((reason) => {
        console.log(reason);
      });
  if (bundled && buildEnd) {
    console.log('successful build');
  } else {
    console.log('failed build');
  }
}
build();
