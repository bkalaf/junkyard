import { decapitalize, capitalize } from './TopBar';

export function kebabToCamelCase(str: string) {
    return decapitalize(str.split('-').map(capitalize).join(''));
}
