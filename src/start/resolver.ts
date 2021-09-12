import { ProjectConfig } from '../../project.config';
import { App } from '../../run.config';

type Environment = { [env: string]: string | number };

type Resolver = (context: {
    name: string;
    port: number;
    environment: Environment;
    globalEnvironment: Environment;
    mode: string;
    apps: App[];
    projectConfig: ProjectConfig;
}) => {
    command?: string[];
    environment?: Environment;
};

export const loadResolver = async (resolverPath: string): Promise<Resolver> => {
    const resolver: Resolver = await import(resolverPath).then((value: { default: Resolver }) => value.default);

    return resolver;
};
