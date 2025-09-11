import { readFile, writeFile } from 'fs/promises';

export const writeFileTool = {
  name: 'write_file',
  description: 'write content into file at path',
  parameters: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'file path'
      },
      data: {
        type: 'string',
        description: 'file content'
      }
    },
    required: ['path', 'data']
  },
  execute: async (args) => {
    const { path, data } = args;
    await writeFile(path, data);
    return `The content was written done at ${path}`;
  }
};

export const readFileTool = {
  name: 'read_file',
  description: 'read file from path, return file content',
  parameters: {
    type: 'object',
    properties: {
      path: {
        type: 'string',
        description: 'file path'
      }
    },
    required: ['path']
  },
  execute: async (args) => {
    const { path } = args;
    return await readFile(path, 'utf8');
  }
};
