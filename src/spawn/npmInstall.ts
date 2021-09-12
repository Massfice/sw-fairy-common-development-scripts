import chalk from 'chalk';
import { exec } from 'teen_process';

const npmInstall = (destinationDir: string, onlyProduction: boolean): Promise<void> => {
    console.log(chalk`{keyword('green') Installing npm packages...}`);

    const args = ['install'];

    if (onlyProduction) {
        args.push('--only=production');
    }

    return exec('npm', args, { shell: true, cwd: destinationDir });
};

export default npmInstall;
