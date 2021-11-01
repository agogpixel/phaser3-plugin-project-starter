# agogpixel/phaser3-plugin-project-starter

Another opinionated [Phaser 3](https://github.com/photonstorm/phaser) plugin project starter with [TypeScript](https://www.typescriptlang.org/), [webpack](https://webpack.js.org/), [Sass](https://sass-lang.com/), & [jest](https://jestjs.io/).

Code style/formatting with [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/); pre-commit hook via [Husky](https://typicode.github.io/husky) & [lint-staged](https://github.com/okonet/lint-staged).

## Getting Started

Create a new repository from this template - see [Creating a repository from a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-repository-from-a-template) for more information.

Alternatively:

```shell
git clone https://github.com/agogpixel/phaser3-plugin-project-starter.git <repo>
cd <repo>
rm -rf .git
git init
git branch -M <branch-name>
git add .
git commit -m "Initial commit."
git remote add origin https://github.com/<account>/<repo>.git
git push -u origin <branch-name>
```

Once the project template has been setup locally, install dependencies:

```shell
npm install
```

## Usage

See the following for information on how plugins work in Phaser 3:

-   [Old API Docs](https://photonstorm.github.io/phaser3-docs/Phaser.Plugins.html)
-   [New API Docs](https://newdocs.phaser.io/docs/3.55.2/Phaser.Plugins)
-   [Plugin System Notes](https://rexrainbow.github.io/phaser3-rex-notes/docs/site/pluginsystem/)
-   [Phaser Labs](https://labs.phaser.io/index.html?dir=plugins/&q=)
-   [Plugin Examples](https://phaser.io/examples/v3/category/plugins)

### File Structure

```text
phaser3-plugin-project-starter/
 |
 ├──.github/                                   * GitHub configurations.
 |   |
 |   ├──workflows/                             * GitHub Actions configurations.
 |   |   └──test.yml                           * Example CI configuration (on push, all branches).
 |   |
 |   └──CODEOWNERS                             * Define who is responsible for code in the repository.
 │
 ├──.vscode/                                   * VSCode configurations.
 |   └──settings.json                          * Example configuration with auto-formatting on save.
 │
 ├──src/                                       * Source files.
 |   |
 |   ├──lib/                                   * Library files.
 |   |   |
 |   |   ├──gameobjects/                       * Phaser game objects.
 |   |   |   ├──example-gameobject.spec.ts     * Example game object unit tests.
 |   |   |   └──example-gameobject.ts          * Example game object.
 |   |   |
 |   |   ├──plugins/                           * Phaser plugins.
 |   |   |   ├──example-global-plugin.spec.ts  * Example global plugin unit tests.
 |   |   |   ├──example-global-plugin.ts       * Example global plugin.
 |   |   |   ├──example-scene-plugin.spec.ts   * Example scene plugin unit tests.
 |   |   |   └──example-scene-plugin.ts        * Example scene plugin.
 |   |   |
 |   |   └──index.ts                           * Library public API.
 |   |
 |   └──index.ts                               * Export the library.
 |
 ├──test/                                      * Testing resources.
 |   |
 |   ├──mocks/                                 * Testing mock files.
 |   |   ├──file-mock.js                       * Mock module import of most binary resources.
 |   |   └──style-mock.js                      * Mock module import of styles.
 |   |
 |   └──test-setup.ts                          * Setup the test environment.
 |
 ├──.editorconfig                              * EditorConfig configurations.
 ├──.eslintrc                                  * ESLint configurations.
 ├──.eslintignore                              * ESLint ignore file.
 ├──.gitignore                                 * Git ignore file.
 ├──.npmrc                                     * NPM configuration.
 ├──.prettierignore                            * Prettier ignore configuration.
 ├──.prettierrc                                * Prettier configuration.
 ├──jest.config.js                             * Jest test framework configuration.
 ├──LICENSE                                    * Project license.
 ├──package-lock.json                          * Auto-generated NPM project configuration.
 ├──package.json                               * NPM project configuration.
 ├──README.md                                  * Project README.
 ├──tsconfig.build.json                        * TypeScript configuration (builds).
 ├──tsconfig.json                              * TypeScript configuration (IDE & tests).
 └──webpack.config.js                          * Webpack configuration.
```

### Develop

Live development with `jest --watch`

```shell
npm start
```

### Lint

Errors & warnings output to stdout via eslint:

```shell
npm run lint
```

Automatically fix fomatting issues (_careful_):

```shell
npm run lint:fix
```

### Unit Test

Unit tests with coverage reporting output to `coverage/` via jest:

```shell
npm test
```

### Build

Build output to `dist/` via webpack:

```shell
npm run build
```

## Contributing

Discuss the change you wish to make via issue or email.

## License

Licensed under the [MIT License](./LICENSE).
