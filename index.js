#!/usr/bin/env node --harmony
var program = require('commander');

program
    .version('0.0.1')
    .command('init [dest] [CompanyName]', 'setup project')
    .command('g [c]', 'generates files based on type')
    .command('notfound', 'displays no command matches', {isDefault: true, noHelp: true})
    .parse(process.argv);
