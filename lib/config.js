import { homedir } from 'os';
import path from 'path';
import { access, constants, readFile, writeFile } from 'fs/promises';

const DEFAULT_CONFIG_DIR = path.join(homedir(), '.newcoder');

export async function loadConfig(dir = DEFAULT_CONFIG_DIR) {
  const rcPath = path.join(dir, 'config.json');
  let content = '';
  try {
    await access(rcPath, constants.F_OK | constants.R_OK | constants.W_OK);
    content = await readFile(rcPath, 'utf8');
  } catch (ex) {
    if (ex.code === 'ENOENT') {
      // ignore when file not exits
      return {};
    }

    throw ex;
  }

  try {
    return JSON.parse(content);
  } catch {
    throw new Error(`Invalid config file: ${rcPath}`);
  }
}

export async function saveConfig(config, dir = DEFAULT_CONFIG_DIR) {
  const rcPath = path.join(dir, 'config.json');
  await writeFile(rcPath, JSON.stringify(config, null, 2));
}
