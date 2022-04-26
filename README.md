# HadesSpace
Parsing and displaying game data

### Build

```bash
# install dependencies
npm install

# install dependencies in modules
npm run postinstall

npm run build
```

### Build a developer build 

```bash
npm install
npm run postinstall

# parse game data
npm run parser

# generate localization strings
npm run i18n:full

# deploy local server
npm run dev
```

### Requirements
- Latest LTS version of [NodeJS](https://nodejs.org)


### Modules

- [parser](/parser) - The main module that works with raw game data
- [i18n](/i18n) - Module that build data for localization
