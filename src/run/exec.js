const shell = require('shelljs');

const [dir, command] = process.argv.slice(2);

shell.exec(`cd ${dir} && ${command}`, {
    windowsHide: true,
});
