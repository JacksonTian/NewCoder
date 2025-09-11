# NewCoder（牛码）

NewCoder 是一个新的本地 Agent 工具。

> 一个 Agent 工具习作，请勿用于生产。

[![NPM version][npm-image]][npm-url]
[![Node.js CI](https://github.com/JacksonTian/NewCoder/actions/workflows/node.js.yml/badge.svg)](https://github.com/JacksonTian/NewCoder/actions/workflows/node.js.yml)
[![codecov][cov-image]][cov-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@jacksontian/newcoder-cli.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@jacksontian/newcoder-cli
[cov-image]: https://codecov.io/gh/JacksonTian/NewCoder/branch/master/graph/badge.svg
[cov-url]: https://codecov.io/gh/JacksonTian/NewCoder
[download-image]: https://img.shields.io/npm/dm/@jacksontian/newcoder-cli.svg?style=flat-square
[download-url]: https://npmjs.org/package/@jacksontian/newcoder-cli

## Prerequisites

- Node.js v20 or higher

## Installation

```sh
# Install new coder as a command line tool
npm install @jacksontian/newcoder -g
```

After installation, you can use `nc` as a command line tool.

```sh
newcoder version
```

## Usage

## Configuration

The configuration file is located at `~/.newcoder/config.json`. It contains the following fields:

- chatEndpoint: The endpoint of the chat service.
- apiKey: The API key of the chat service.
- model: The model name of the chat service.

## License

The [MIT License](./LICENSE).
