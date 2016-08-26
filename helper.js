'use strict';

const readLine = require('readline');
const fs = require('fs');

module.exports.createFolder =  function createFolder(name) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(name)) {
            reject('Already exist');
        }

        fs.mkdir(name, (err) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        });
    })
};

module.exports.createFile =  function createFile(name, content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, content, (err) => {
            if (err) {
                console.error(err);
                reject(err);
            }

            resolve(name);
        })
    });
};

module.exports.toDash =  function toDash(str) {
    return str.replace(/([A-Z])/g, function ($1) {
        return "-" + $1.toLowerCase();
    });
};

module.exports.toCamel =  function toCamel(str) {
    return str.replace(/(\-[a-z])/g, function ($1) {
        return $1.toUpperCase().replace('-', '');
    });
};

module.exports.capitalize =  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

module.exports.ask =  function ask(question) {
    return new Promise((resolve) => {
        let rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question + ': ', (answer) => {
            rl.close();
            resolve(answer);
        });
    });
};

module.exports.js = function js(name) {
    return `
class ${module.exports.capitalize(module.exports.toCamel(name))}Controller {
    constructor() {
    }
}

export default {
    controller: ${module.exports.capitalize(module.exports.toCamel(name))}Controller,
    template: require('./${module.exports.toDash(name)}.html'),
    bindings: {
        
    }
};
`.trim();
};

module.exports.html =  function html() {
    return `<div></div>`;
};

module.exports.scss =  function scss(name) {
    return `${name} {
}`;
};