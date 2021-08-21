const path = require('path');
const shelljs = require('shelljs');
const fs = require('fs');

const argv = process.argv;
const dir = argv[2];
const exitPrefixLen = Number(argv[3]);
let files = [];

async function getFiles() {
    await new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        })
    }).then(data => {
        files = data;
    });

    for (let i = 0; i < files.length; i++) {
        let rename = `${i + 1}`.padStart(3, 0) + files[i].substr(exitPrefixLen);
        shelljs.mv(`${dir}\\${files[i]}`, `${dir}\\${rename}`)
    }
}

getFiles();
