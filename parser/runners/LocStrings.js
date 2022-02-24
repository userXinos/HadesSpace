import Runner from '../modules/Runner.js';

export default class LocStrings extends Runner {
    prettierConfig = {
        printWidth: 80085,
    }

    static config = {
        file: /loc_strings_\w+/,
    }

    static parse(csv) {
        return Object.fromEntries(
            csv
                .trim()
                .split(/\r?\n/)
                .filter((s) => !s.startsWith('//'))
                .map((s) => s
                    .split(/"(.+?)","(.+?)"/)
                    .slice(1, 3),
                ),
        );
    }

    async run(data) {
        const md = this.metadata;

        // "loc_strings_en" -> "en"
        md.saveAs = md.originalFile.replace(/loc_strings_(.+)\.(\w+)$/, '$1.$2');
        delete data['TID_INTRO_MESSAGE']; // ломает json, нету смысла спасать

        return data;
    }
}
