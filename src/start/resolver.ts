type Environment = { [env: string]: string | number };

type Resolver = (
    name: string,
    port: number,
    environment: Environment,
) => { command?: string[]; environment?: Environment };

export const loadResolver = async (resolverPath: string): Promise<Resolver> => {
    const resolver: Resolver = await import(resolverPath).then((value: { default: Resolver }) => value.default);

    return resolver;
};
