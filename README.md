# HadesSpace
Parsing and displaying game data

### Build

```bash
# install dependencies
npm install

# build
npm run build
```

### Build a developer build 

```bash
# install dependencies if not already installed
npm install

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

### Contributing & Contributors

Contributions are welcome! Please see the [CONTRIBUTING.md](/CONTRIBUTING.md) file for more information.
