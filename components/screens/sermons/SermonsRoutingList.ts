import {SermonKey} from "../../i18n";

interface ISermon {
    id: number;
    sermonKey: SermonKey;
}

export const sermonsRoutingList:ISermon[] = [
    {
        id: 0,
        sermonKey: 'PanchaNivarana'
    },
    {
        id: 1,
        sermonKey: 'SantaSukha'
    },
    {
        id: 2,
        sermonKey: 'DanaSilaBhavana'
    },
    {
        id: 3,
        sermonKey: 'Salayatana'
    },
];
