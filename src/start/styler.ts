import chalk from 'chalk';

import { Style } from '../../run.config';

const styler = (prefix: string, appName: string, style: Style, suffix = ''): string => {
    const styleArray: string[] = [];

    if (style.bold) {
        styleArray.push('bold');
    }

    if (style.italic) {
        styleArray.push('italic');
    }

    if (style.underline) {
        styleArray.push('underline');
    }

    if (style.strikethrough) {
        styleArray.push('strikethrough');
    }

    if (style.color && style.color.startsWith('#')) {
        styleArray.push(`hex('${style.color}')`);
    }

    if (style.color && !style.color.startsWith('#')) {
        styleArray.push(`keyword('${style.color}')`);
    }

    if (style.bg && style.bg.startsWith('#')) {
        styleArray.push(`bgHex('${style.bg}')`);
    }

    if (style.bg && !style.bg.startsWith('#')) {
        styleArray.push(`bgKeyword('${style.bg}')`);
    }

    const styleString = styleArray.length > 0 ? styleArray.join('.') : '';

    const formattedAppName = styleString === '' ? appName : chalk`{${styleString} ${appName}}`;

    return `${prefix} ${formattedAppName} ${suffix}`;
};

export default styler;
