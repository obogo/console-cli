#!/usr/bin/env node --harmony
var program = require('commander');

program
    .version('0.0.1')
    .command('new [AppName] [dest]', 'Creates a new project, destination is optional')
    .command('g [c]', 'generates files based on type')
    .command('page [page] [template]', 'copy page template over')
    .command('notfound', 'displays no command matches', {isDefault: true, noHelp: true})
    .parse(process.argv);
