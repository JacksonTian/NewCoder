# NewCoder（牛码）

NewCoder 是一个新的本地 Agent 工具。

> 一个 Agent 工具习作，请勿用于生产。

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
