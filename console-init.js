#!/usr/bin/env node
var fs = require('fs-extra');
var path = require('path');
var program = require('commander');
var replace = require('replace');
var rootPath = path.dirname(fs.realpathSync(__filename));
var templatesPath = path.join(rootPath, 'templates');

program.action(function (companyName, dest, options) {

    companyName = companyName || 'MyCompany';
    dest = typeof dest === 'string' ? dest : 'test';
    fs.copySync(path.join(templatesPath, 'project'), dest);
    replace({
        regex: '{CompanyName}',
        replacement: companyName,
        paths: [dest],
        recursive: true,
        silent: true
    });

    console.log('Project initialized!'.green);
    console.log('Run the following commands:');
    console.log('cd'.blue, dest.blue);
    console.log('npm install'.blue);
    console.log('bower install'.blue);
    console.log('grunt watch'.blue, 'to have app reload automatically on changes');
});

program.parse(process.argv);
