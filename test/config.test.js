import { describe, it, before } from 'node:test';
import assert from 'assert/strict';
import { fileURLToPath } from 'url';
import path from 'path';
import { unlink } from 'fs/promises';

import { loadConfig, saveConfig } from '../lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockConfigDir = path.join(__dirname, 'fixtures/config_dir');

describe('config', () => {
  before(async () => {
    try {
      await unlink(path.join(mockConfigDir, 'config.json'));
    } catch (ex) {
      if (ex.code !== 'ENOENT') {
        throw ex;
      }
    }
  });

  it('load empty config should ok', async () => {
    const conf = await loadConfig(mockConfigDir);
    assert.deepStrictEqual(conf, {});
  });

  it('write config should ok', async () => {
    const conf = await loadConfig(mockConfigDir);
    assert.deepStrictEqual(conf, {});
    conf.apiKey = 'xxx';
    await saveConfig(conf, mockConfigDir);
    const newConf = await loadConfig(mockConfigDir);
    assert.deepStrictEqual(newConf, { 'apiKey': 'xxx' });
  });
});
