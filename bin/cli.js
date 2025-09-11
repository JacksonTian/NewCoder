#!/usr/bin/env node

import { Command } from 'commander';

import pkg from '../package.json' with {
  type: 'json'
};

const program = new Command('coder');

program.addCommand(new Command('help').action(async () => {
  console.log('help');
}));

program.command('version').description('show version').action(() => {
  console.log(pkg.version);
});

program.parse();
