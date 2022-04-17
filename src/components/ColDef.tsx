
export type ColDef = { header: string; property: string; convertOut?: string };

const convertDate = (date: string) => {
    const x = new Date(Date.parse(date));
    return [(x.getMonth() + 1).toFixed(0).padStart(2, '0'), x.getDate().toString().padStart(2, '0'),x.getFullYear().toString()].join('/');
};