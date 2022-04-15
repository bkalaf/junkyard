import { partitionBy } from "./partitionBy";
import { snd } from "./snd";
import { fst } from "./fst";
import { distinct } from "./distinct";

export function cn<T>(props: { className?: string; } & T, obj: Record<string, boolean>, ...classes: string[]) {
    console.log('props', props, 'obj', obj, classes);
    const { className, ...remain } = props;
    const [t, f] = partitionBy<[string, boolean]>(snd)(Object.entries(obj));
    const [trues, falses] = [t.map(fst), f.map(fst)];
    return { ...remain, className: distinct(trues.concat(...(className ? [...className.split(' '), ...classes] : classes))).filter(x => !falses.includes(x)).join(' ') };
}
