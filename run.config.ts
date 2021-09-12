export interface Style {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strikethrough?: boolean;
    bg?: string;
    color?: string;
}

export interface App {
    name: string;
    environment: { [mode: string]: { env: string | number } };
    dir: string;
    resolverPath: string;
    style?: Style;
    port?: number;
}

export interface RunConfig {
    apps: App[];
}
