export interface App {
    name: string;
    environment: Record<string, string>;
    dir: string;
    command: string[];
    useReload?: boolean;
    resolverPath: string;
}

export interface runConfig {
    apps: App[];
}
