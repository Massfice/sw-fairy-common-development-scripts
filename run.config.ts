export interface App {
    name: string;
    environment: Record<string, string>;
    dir: string;
    resolverPath: string;
}

export interface runConfig {
    apps: App[];
}
