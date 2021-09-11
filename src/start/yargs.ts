import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

type Yargs = { mode: string };

const yargsMaker = async (): Promise<Yargs> => {
    const { argv } = yargs(hideBin(process.argv))
        .command('gulp start [mode]', 'start the applications', (yargs) => {
            return yargs.positional('mode', {
                default: 'default',
            });
        })
        .demandCommand(1);

    const data = await argv;

    return { mode: data.mode };
};

export default yargsMaker;
