import { useParams } from 'react-router-dom';

export function useCollectionName(backup?: string): string {
    const { collection } = useParams();
    if (collection == null) {
        if (backup == null) {
            throw new Error('collection name empty');
        }
        return backup;
    }
    return collection ?? backup;
}
