import fs from 'fs/promises';
import path from 'path';

export default class ToolManager {
  #tools = [];
  #executors = {};
  constructor() {
  }

  addTool(tool) {
    if (this.#executors[tool.name]) {
      throw new Error(`Tool ${tool.name} already exists`);
    }

    // 检查工具是否包含必要属性
    if (!tool.name || !tool.description || !tool.parameters || !tool.execute) {
      throw new Error('Tool is not valid');
    }

    this.#tools.push({
      type: 'function',
      function:{
        name: tool.name,
        description: tool.description,
        parameters: tool.parameters
      }
    });
    this.#executors[tool.name] = tool.execute;
  }

  getTools() {
    return this.#tools;
  }

  /**
   * 加载指定目录中的工具模块
   * @param {string} toolsDir - 包含工具模块的目录路径
   * @returns {Promise<void>} 返回一个空的Promise，表示加载完成
   */
  async loadTools(toolsDir) {
    const files = await fs.readdir(toolsDir);
    for (const file of files) {
      // 只处理.js文件
      if (!file.endsWith('.js')) {
        continue;
      }
      await this.loadToolsFromPath(path.join(toolsDir, file));
    }
  }

  async loadToolsFromPath(toolPath) {
    const module = await import(toolPath);
    // 遍历模块中的所有导出项
    Object.keys(module).forEach((key) => {
      const tool = module[key];
      // 跳过被禁用的工具
      if (tool.disabled) {
        return;
      }

      this.addTool(tool);
    });
  }

  async callTool(toolName, args) {
    const execute = this.#executors[toolName];
    if (!execute) {
      throw new Error(`Tool ${toolName} not found`);
    }

    console.log(`Calling tool ${toolName} with args:`, args);
    try {
      return await execute(args);
    } catch (err) {
      console.error(`Error calling tool ${toolName}:`, err);
      return `Calling tool failed with Error${err.message}`;
    }
  }

  async callTools(calls) {
    return await Promise.all(calls.map(async (toolCall) => {
      const toolName = toolCall.function.name;
      const toolArgs = JSON.parse(toolCall.function.arguments);
      const toolResult = await this.callTool(toolName, toolArgs);

      return {
        tool_call_id: toolCall.id,
        name: toolName,
        role: 'tool',
        content: toolResult
      };
    }));
  }
}
