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
    environment: Record<string, string>;
    dir: string;
    resolverPath: string;
    style?: Style;
}

export interface RunConfig {
    apps: App[];
}
