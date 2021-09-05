declare module 'run.config.json' {
    export class App {
        name: string;
        environment: Record<string, string>;
        dir: string;
        command: string;
        useReload?: boolean;
    }

    export const apps: App[];
}
