type Script = (templateDir: string, destinationDir: string) => Promise<void> | NodeJS.ReadWriteStream;

const executeScripts = async (templateDir: string, destinationDir: string): Promise<void> => {
    const scripts: Script[] = await import(templateDir).then((value: { default: Script[] }) => value.default);

    if (!scripts) {
        throw new Error('Scripts are not loaded');
    }

    for (const script of scripts) {
        script(templateDir, destinationDir);
    }
};

export default executeScripts;
