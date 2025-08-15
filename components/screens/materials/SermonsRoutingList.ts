import {MaterialKey} from "../../i18n";

export interface IMaterial {
    id: number;
    materialKey: MaterialKey;
}

const generateId = () => Math.floor(Math.random() * 1000000000);

export const sermonsRoutingList:IMaterial[] = [
    {
        id: generateId(),
        materialKey: 'Vipassanupakkilesa'
    },
    {
        id: generateId(),
        materialKey: 'PanchaNivarana'
    },
    {
        id: generateId(),
        materialKey: 'SantaSukha'
    },
    {
        id: generateId(),
        materialKey: 'DanaSilaBhavana'
    },
    {
        id: generateId(),
        materialKey: 'Viveka'
    },
    {
        id: generateId(),
        materialKey: 'Sankhara'
    },
    {
        id: generateId(),
        materialKey: 'PanchaKkhandha'
    },
    {
        id: generateId(),
        materialKey: 'Anicca'
    },
    {
        id: generateId(),
        materialKey: 'YonisoManasikara'
    },
    {
        id: generateId(),
        materialKey: 'Sankharaloka'
    },
    {
        id: generateId(),
        materialKey: 'Vedananupassana'
    },
    {
        id: generateId(),
        materialKey: 'Kama'
    },
    {
        id: generateId(),
        materialKey: 'Salayatana'
    },
    {
        id: generateId(),
        materialKey: 'Dhatu18'
    },
    {
        id: generateId(),
        materialKey: 'Upasamanussati'
    },
    {
        id: generateId(),
        materialKey: 'SankappaRago'
    },
];

export const recitationsRoutingList:IMaterial[] = [
    {
        id: generateId(),
        materialKey: 'AllRecitations',
    },
     {
        id: generateId(),
        materialKey: 'Namaskaras',
    },
     {
        id: generateId(),
        materialKey: 'Qualities',
    },
     {
        id: generateId(),
        materialKey: 'Veneration',
    },
     {
        id: generateId(),
        materialKey: 'Confession',
    },
     {
        id: generateId(),
        materialKey: 'Offering',
    },
]