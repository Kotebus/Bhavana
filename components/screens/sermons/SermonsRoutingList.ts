import {SermonKey} from "../../i18n";

interface ISermon {
    id: string;
    sermonKey: SermonKey;
}

export const sermonsRoutingList:ISermon[] = [
    {
        id: crypto.randomUUID(),
        sermonKey: 'Vipassanupakkilesa'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'PanchaNivarana'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'SantaSukha'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'DanaSilaBhavana'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Viveka'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Sankhara'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'PanchaKkhandha'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Anicca'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'YonisoManasikara'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Sankharaloka'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Vedananupassana'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Kama'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Salayatana'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Dhatu18'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'Upasamanussati'
    },
    {
        id: crypto.randomUUID(),
        sermonKey: 'SankappaRago'
    },
];
