<p align="center"><img src="/src/img/logo.png" alt="logo"></p>
<h1 align="center">HadesSpace</h1>

The project contains a tool for parsing csv tables compiled from game data. The developed parser combines information from various game tables, collecting data in a convenient format (.js, .json etc). Parsed data is also used by community members to develop their Discord bots.

The Vuejs3 web application supports PWA and optimal display on various screens, and also supports the entire locale from the game and additional ones contributed by the community. [Current deployment](https://userxinos.github.io/HadesSpace/)

If you are a data miner, you can find tables in the [parser directory](/parser), and images in [src](src/img)

### Build web-app

```bash
npm install # install dependencies
npm run build # build
```

### Build a developer build 

```bash
npm install # install dependencies if not already installed
npm run parser # parse game data
npm run i18n:full # generate localization strings
npm run dev # deploy local server
```

### Requirements
- 20+ version of [NodeJS](https://nodejs.org)


### Modules

- [parser](/parser) - The main module that works with raw game data
- [i18n](/i18n) - Module that build data for localization

### Contributing & Contributors

Contributions are welcome! Please see the [CONTRIBUTING.md](/CONTRIBUTING.md) file for more information.
