import {SermonKey} from "../../i18n";

interface ISermon {
    id: number;
    sermonKey: SermonKey;
}

const generateId = () => Math.floor(Math.random() * 1000000000);

export const sermonsRoutingList:ISermon[] = [
    {
        id: generateId(),
        sermonKey: 'Vipassanupakkilesa'
    },
    {
        id: generateId(),
        sermonKey: 'PanchaNivarana'
    },
    {
        id: generateId(),
        sermonKey: 'SantaSukha'
    },
    {
        id: generateId(),
        sermonKey: 'DanaSilaBhavana'
    },
    {
        id: generateId(),
        sermonKey: 'Viveka'
    },
    {
        id: generateId(),
        sermonKey: 'Sankhara'
    },
    {
        id: generateId(),
        sermonKey: 'PanchaKkhandha'
    },
    {
        id: generateId(),
        sermonKey: 'Anicca'
    },
    {
        id: generateId(),
        sermonKey: 'YonisoManasikara'
    },
    {
        id: generateId(),
        sermonKey: 'Sankharaloka'
    },
    {
        id: generateId(),
        sermonKey: 'Vedananupassana'
    },
    {
        id: generateId(),
        sermonKey: 'Kama'
    },
    {
        id: generateId(),
        sermonKey: 'Salayatana'
    },
    {
        id: generateId(),
        sermonKey: 'Dhatu18'
    },
    {
        id: generateId(),
        sermonKey: 'Upasamanussati'
    },
    {
        id: generateId(),
        sermonKey: 'SankappaRago'
    },
];
