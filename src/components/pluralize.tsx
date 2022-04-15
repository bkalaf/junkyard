export default function pluralize(str: string) {
    if (str.endsWith('y')) {
        return str.slice(0, str.length - 1).concat('ies');
    }
    return str.concat('s');
}
