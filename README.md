# create-textlint-rule [![Build Status](https://travis-ci.org/textlint/create-textlint-rule.svg?branch=master)](https://travis-ci.org/textlint/create-textlint-rule)

Create textlint rule with no configuration.

This command line tools generate textlint rule project files by one command.


## Install

Install with [npm](https://www.npmjs.com/):

    npm install create-textlint-rule -g
    # Or
    npx create-textlint-rule

## Usage

Usage of `create-textlint-rule` command.

    $ create-textlint-rule --help
    Usage
      $ create-textlint-rule rule-name

    Options
      --help  Show help
      --yarn  Use yarn for installing
      --yes   Pass --yes all for initializing process

    Examples
      # create textlint-rule-example directory and install
      $ create-textlint-rule example
      # install to current directory
      $ create-textlint-rule .

Create textlint rule project by following command:

```sh
$ create-textlint-rule no-todo
#`textlint-rule-no-todo` project is created in current dir
```

You can start to develop textlint rule.
(See [textlint-scripts](https://github.com/textlint/textlint-scripts "textlint-scripts") for more details.)

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build
    
### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester"). 

    npm test

### Publish

Publish your rule to [npm](https://www.npmjs.com/). 

    # Update version and git tag `patch` or `minor` or `major`
    npm version {patch|minor|major}
    npm publish


**Next**

You can learn to create textlint rule.

- [textlint/README.md at master · textlint/textlint](https://github.com/textlint/textlint/blob/master/docs/README.md "textlint/README.md at master · textlint/textlint")

## Reference

This Command line tools based on these project.

- [textlint/textlint-rule-template: This is TEMPLATE REPOSITORY for creating textlint rule.](https://github.com/textlint/textlint-rule-template)
- [textlint/textlint-scripts: textlint npm-run-scripts CLI help to create textlint rule.](https://github.com/textlint/textlint-scripts)
- [facebookincubator/create-react-app: Create React apps with no build configuration.](https://github.com/facebookincubator/create-react-app "facebookincubator/create-react-app: Create React apps with no build configuration.")

## Changelog

See [Releases page](https://github.com/textlint/create-textlint-rule/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/textlint/create-textlint-rule/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
