import { isUpper } from "./isUpper";
import { capitalize } from "./capitalize";
import { splitAt } from "./splitAt";

export function ofKebabOrCamelCaseToTitle(str: string) {
    if (str.includes('-')) {
        return str.split('-').map(capitalize).join(' ');
    } else if (str.split('').some(isUpper)) {
        return splitAt((x: string) => /[A-Z]/.test(x))(str.split(''))
            .map((x) => capitalize(x.join('')))
            .join(' ');
    }
    return capitalize(str);
}
