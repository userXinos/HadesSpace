const Bundler = require('parcel-bundler');
const fs = require('fs');
const p = require('phin');

// Путь к файлу точки входа
const file = './pages/*.html';

const WH = process.env.WH_BUILD_RESULT || null;
const pathSave = process.argv[2] || './dist/';

const options = {
  outDir: pathSave, // Каталог для файлов сборки, по умолчанию - dist
  // outFile: './pages/*.html', // Имя выходного файла
  publicUrl: '.', // Путь, который обслуживает сервер, по умолчанию - '/'
  watch: false, // следует ли отслеживать изменения файлов и пересобирать их при изменении, по умолчанию - process.env.NODE_ENV !== 'production'
  cache: true, // Включает или отключает кеширование, по умолчанию - true
  cacheDir: '.cache', // Каталог кеширования, по умолчанию .cache
  minify: true, // Минизировать файлы, включено если process.env.NODE_ENV === 'production'
  target: 'browser', // browser/node/electron, по умолчанию - browser
  // https: false, // Использовать защищённое соединение (https) для файлов, по умолчанию - false
  logLevel: 3, // 3 = логировать всё, 2 = логировать предупреждения и ошибки, 1 = логировать ошибки
  // hmrPort: 0, // Порт на котором работает сокет hmr, по умолчанию - случайный свободный порт (0 в node.js определяет случайный свободный порт)
  sourceMaps: true, // Включить или отключить sourcemaps, по умолчанию включено (пока ещё не поддерживается в минифицированных сборках)
  hmrHostname: '', // Имя хоста для модуля горячей перезагрузки, по умолчанию - ''
  detailedReport: true, // Распечатывает подробный отчёт о бандлах, ресурсах, размерах файлов и времени, по умолчанию - false, отчёты распечатываются, если watch отключен
};

async function build() {
  const startTime = new Date().getTime();
  let buildEnd; let bundled; let error;
  const bundler = new Bundler(file, options); // Инициализует упаковщик, используя местоположение точки входа и предоставленные опции

  bundler.on('buildEnd', () => {
    buildEnd = true;
  });
  bundler.on('bundled', () => { // упаковщик содержит все ресурсы и бандлы, подробности смотрите в документации
    bundled = true;

    // добавить статичные файлы локализации
    const pathData = './data/';
    const files = fs.readdirSync(pathData)
        .filter((e) => (e.endsWith('.json')));

    files.forEach((e) => {
      fs.copyFile(pathData + e, pathSave + e, (err) => {
        if (err) {
          error = true;
          throw err;
        }
      });
    });
  });
  await bundler.bundle();
  return {
    isSucces: (buildEnd && bundled && !error),
    time: (new Date().getTime() - startTime) / 1000,
  };
}

build().then((response) => {
  let data; let str;

  if (response.isSucces) {
    str = `successful build (${response.time} сек.)`;
    data = {
      embeds: [
        {
          color: 53504,
          author: {
            name: str,
            icon_url: 'https://i.imgur.com/QppzocC.png',
          },
        },
      ],
    };
  } else {
    str = 'failed build';
    data = {
      embeds: [
        {
          color: 11674146,
          author: {
            name: str,
            icon_url: 'https://i.imgur.com/JiLNADw.png',
          },
        },
      ],
    };
  }
  console.log(str);
  if (WH) { // вебхук
    p({
      url: WH,
      method: 'POST',
      data: data,
    });
  }
});
