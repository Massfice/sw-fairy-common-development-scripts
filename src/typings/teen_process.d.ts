declare module 'teen_process' {
    enum Event {
        exit = 'exit',
        stop = 'stop',
        end = 'end',
        die = 'die',
        output = 'output',
        'lines-stdout' = 'lines-stdout',
        'stream-line' = 'stream-line',
    }

    type Callback = (prop1: string, props2?: string) => void;

    export class SubProcess {
        proc: { pid: number };

        constructor(
            command: string,
            args: string[],
            options: { shell: boolean; cwd: string; env: { [env: string]: string | number } },
        );

        start: () => Promise<void>;

        stop: () => Promise<void>;

        on: (event: Event, callback: Callback) => void;
    }

    export function exec(command: string, args: string[], options: { shell: boolean; cwd: string }): Promise<void>;
}
