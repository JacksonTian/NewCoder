import { describe, it } from 'node:test';
import assert from 'assert/strict';
import { fileURLToPath } from 'url';
import path from 'path';
import ToolManager from '../lib/tool.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('tool', () => {
  it('load tools should ok', async () => {
    const tm = new ToolManager();
    assert.deepStrictEqual(tm.getTools(), []);
  });

  it('should add tool correctly', () => {
    const tm = new ToolManager();
    const tool = {
      name: 'test_tool',
      description: 'A test tool',
      parameters: {
        type: 'object',
        properties: {
          param1: { type: 'string' }
        },
        required: ['param1']
      },
      execute: async (args) => {
        return `Executed with ${args.param1}`;
      }
    };

    tm.addTool(tool);
    const tools = tm.getTools();
    assert.strictEqual(tools.length, 1);
    assert.strictEqual(tools[0].type, 'function');
    assert.strictEqual(tools[0].function.name, 'test_tool');
    assert.strictEqual(tools[0].function.description, 'A test tool');
  });

  it('should throw error when adding tool with same name', () => {
    const tm = new ToolManager();
    const tool1 = {
      name: 'duplicate_tool',
      description: 'First tool',
      parameters: { type: 'object', properties: {}, required: [] },
      execute: async () => 'result1'
    };

    const tool2 = {
      name: 'duplicate_tool',
      description: 'Second tool',
      parameters: { type: 'object', properties: {}, required: [] },
      execute: async () => 'result2'
    };

    tm.addTool(tool1);
    assert.throws(() => tm.addTool(tool2), {
      message: 'Tool duplicate_tool already exists'
    });
  });

  it('should throw error when adding invalid tool', () => {
    const tm = new ToolManager();
    const invalidTool = {
      name: 'invalid_tool'
      // Missing description, parameters and execute
    };

    assert.throws(() => tm.addTool(invalidTool), {
      message: 'Tool is not valid'
    });
  });

  it('should load tools from directory', async () => {
    const tm = new ToolManager();
    const toolsDir = path.join(__dirname, '../tools');

    await tm.loadTools(toolsDir);
    const tools = tm.getTools();

    // Should have at least the tools from the tools directory
    assert.ok(tools.length >= 3); // fs.js has 2 tools, time.js has 1 tool

    // Check that tools have correct structure
    const toolNames = tools.map(tool => tool.function.name);
    assert.ok(toolNames.includes('write_file'));
    assert.ok(toolNames.includes('read_file'));
    assert.ok(toolNames.includes('get_current_time'));
  });

  it('should call tool correctly', async () => {
    const tm = new ToolManager();
    const tool = {
      name: 'echo_tool',
      description: 'Echo tool',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        },
        required: ['message']
      },
      execute: async (args) => {
        return `Echo: ${args.message}`;
      }
    };

    tm.addTool(tool);
    const result = await tm.callTool('echo_tool', { message: 'hello' });
    assert.strictEqual(result, 'Echo: hello');
  });

  it('should throw error when calling non-existent tool', async () => {
    const tm = new ToolManager();
    await assert.rejects(async () => {
      await tm.callTool('non_existent_tool', {});
    }, {
      message: 'Tool non_existent_tool not found'
    });
  });

  it('should handle tool execution error', async () => {
    const tm = new ToolManager();
    const tool = {
      name: 'error_tool',
      description: 'Error tool',
      parameters: { type: 'object', properties: {}, required: [] },
      execute: async () => {
        throw new Error('Tool execution failed');
      }
    };

    tm.addTool(tool);
    const result = await tm.callTool('error_tool', {});
    assert.ok(result.includes('Calling tool failed with ErrorTool execution failed'));
  });

  it('should call multiple tools', async () => {
    const tm = new ToolManager();
    const tool1 = {
      name: 'tool1',
      description: 'Tool 1',
      parameters: { type: 'object', properties: {}, required: [] },
      execute: async (args) => {
        return 'result1';
      }
    };

    const tool2 = {
      name: 'tool2',
      description: 'Tool 2',
      parameters: { type: 'object', properties: {}, required: [] },
      execute: async (args) => {
        return 'result2';
      }
    };

    tm.addTool(tool1);
    tm.addTool(tool2);

    const calls = [
      {
        id: 'call1',
        function: {
          name: 'tool1',
          arguments: '{}'
        }
      },
      {
        id: 'call2',
        function: {
          name: 'tool2',
          arguments: '{}'
        }
      }
    ];

    const results = await tm.callTools(calls);
    assert.strictEqual(results.length, 2);
    assert.strictEqual(results[0].tool_call_id, 'call1');
    assert.strictEqual(results[0].name, 'tool1');
    assert.strictEqual(results[0].content, 'result1');
    assert.strictEqual(results[1].tool_call_id, 'call2');
    assert.strictEqual(results[1].name, 'tool2');
    assert.strictEqual(results[1].content, 'result2');
  });
});
