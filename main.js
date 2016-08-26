#!/usr/bin/env node
'use strict';
var _require = require('./helper');

var ask = _require.ask;
var createFolder = _require.createFolder;
var createFile = _require.createFile;
var js = _require.js;
var html = _require.html;
var scss = _require.scss;
var toDash = _require.toDash;

ask('Name').then((name) => {
    let dashedName = toDash(name);
    let dir = './' + dashedName + '/';
    let cfPromise = createFolder(dir);

    Promise.all([
        cfPromise.then(() => createFile(dir + dashedName + '.component.js', js(name))),
        cfPromise.then(() => createFile(dir + dashedName + '.html', html())),
        cfPromise.then(() => createFile(dir + dashedName + '.scss', scss(dashedName))),
    ])
        .then(() => console.log('Component created'));
});
