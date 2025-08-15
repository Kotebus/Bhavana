import {ContentKey} from "../../i18n";

export interface IContent {
    id: number;
    contentKey: ContentKey;
}

const generateId = () => Math.floor(Math.random() * 1000000000);

export const sermonsRoutingList:IContent[] = [
    {
        id: generateId(),
        contentKey: 'Vipassanupakkilesa'
    },
    {
        id: generateId(),
        contentKey: 'PanchaNivarana'
    },
    {
        id: generateId(),
        contentKey: 'SantaSukha'
    },
    {
        id: generateId(),
        contentKey: 'DanaSilaBhavana'
    },
    {
        id: generateId(),
        contentKey: 'Viveka'
    },
    {
        id: generateId(),
        contentKey: 'Sankhara'
    },
    {
        id: generateId(),
        contentKey: 'PanchaKkhandha'
    },
    {
        id: generateId(),
        contentKey: 'Anicca'
    },
    {
        id: generateId(),
        contentKey: 'YonisoManasikara'
    },
    {
        id: generateId(),
        contentKey: 'Sankharaloka'
    },
    {
        id: generateId(),
        contentKey: 'Vedananupassana'
    },
    {
        id: generateId(),
        contentKey: 'Kama'
    },
    {
        id: generateId(),
        contentKey: 'Salayatana'
    },
    {
        id: generateId(),
        contentKey: 'Dhatu18'
    },
    {
        id: generateId(),
        contentKey: 'Upasamanussati'
    },
    {
        id: generateId(),
        contentKey: 'SankappaRago'
    },
];

export const recitationsRoutingList:IContent[] = [
    {
        id: generateId(),
        contentKey: 'AllRecitations',
    },
     {
        id: generateId(),
        contentKey: 'Namaskaras',
    },
     {
        id: generateId(),
        contentKey: 'Qualities',
    },
     {
        id: generateId(),
        contentKey: 'Veneration',
    },
     {
        id: generateId(),
        contentKey: 'Confession',
    },
     {
        id: generateId(),
        contentKey: 'Offering',
    },
]