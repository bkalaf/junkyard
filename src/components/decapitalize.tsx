export function decapitalize(s: string) {
    if (s.length === 0)
        return '';
    return [s[0].toLowerCase(), s.slice(1)].join('');
}
