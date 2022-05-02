# HadesSpace i18n module
Standalone submodule for generating locale files based on game locale files and additional strings

### Project Structure

```text
i18n
├─── dist - Generated data
├─── modules - Main modules of the program
├─── locales - New strings for each language
└─── configKeys - Auxiliary configuration files
```

### Run
- `npm install`
- `npm start`

### Arguments
Accepts filenames with strings to be added to output files as arguments

#### Flags
| Name     |                      Description                       | Default |
|----------|:------------------------------------------------------:|--------:|
| `--full` | Add all possible strings from which locale to the file |         |
