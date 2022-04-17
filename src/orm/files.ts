import { apolloEntry } from './../config';
import * as fs from 'graceful-fs';

export class Entry {
    _id = '';
    isProcessed = false;
    materializedPath = '';
    name: {
        basename: string;
        extension: string;
    } = {
        basename: '',
        extension: ''
    };
    parent?: string;
    blob?: string;
}

const value = {
    entry: apolloEntry(
        'entry',
        'MATERIALIZEDPATH_ASC',
        'isProcessed\nmaterializedPath\nparent {\n_id\nmaterializedPath\nname{\nbasename\nextension\n}\n}blob {\n_id\ndata\nmimetype\n}\n}',
        '_id',
        'isProcessed',
        ['materializedPath'],
        ['entry', 'parent', ['_id', ['materializedPath'], ['name', ['basename', 'extension']]]],
        ['name', ['basename', 'extension']],
        ['blob', 'blob', ['_id', 'hash', 'data']]
    ),
    blob: apolloEntry(
        'blob',
        'ORIGINAL_ASC',
        'original\nhash\ndata\nmimetype\nentry {\nmaterializedPath @client\n_id\n}\nsize {\nvalue\nunit\n}',
        '_id',
        'original',
        'hash',
        'data',
        'mimetype',
        ['entry', 'entry', ['_id', ['materializedPath']]]
    )
};

fs.writeFileSync('entry.json', JSON.stringify(value));
