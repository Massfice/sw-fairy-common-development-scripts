const Vinyl = require('vinyl');
const gulp = require('gulp');
const chalk = require('chalk');

const createJSONFile = (filename, destinationDir, obj) => {
    console.log(chalk`{keyword('green') Creating} {bold.keyword('green') ${filename}} {keyword('green') file...}`);

    const stream = require('stream').Readable({ objectMode: true });

    stream._read = function () {
        this.push(
            new Vinyl({
                path: filename,
                contents: Buffer.from(JSON.stringify(obj, null, 4), 'utf-8'),
            }),
        );

        this.push(null);
    };

    return stream.pipe(gulp.dest(destinationDir));
};

const createRunConfig = async (templateDir, destinationDir) => {
    return createJSONFile('run.config.json', destinationDir, {
        environment: { default: {} },
        apps: [
            {
                name: 'name',
                environment: { default: {} },
                dir: 'dir',
                resolverPath: 'resolverPath',
                style: {
                    bold: true,
                    italic: true,
                    underline: true,
                    strikethrough: true,
                    color: 'red',
                    bg: 'gray',
                },
            },
        ],
    });
};

const createProjectConfig = async (templateDir, destinationDir) => {
    return createJSONFile('project.config.json', destinationDir, {
        default: {
            port: 1000,
        },
    });
};

module.exports = [createRunConfig, createProjectConfig];