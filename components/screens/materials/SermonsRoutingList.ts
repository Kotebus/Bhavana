import {MaterialKey} from "../../i18n";

export interface IMaterial {
    id: number;
    materialKey: MaterialKey;
}

const generateId = () => Math.floor(Math.random() * 1000000000);
const createNewMaterialItem = (materialKey: MaterialKey) : IMaterial =>
    ({ id: generateId(), materialKey } as const);

export const SERMONS_MATERIALS_LIST: MaterialKey[] = [
    'Vipassanupakkilesa',
    'PanchaNivarana',
    'SantaSukha',
    'DanaSilaBhavana',
    'Viveka',
    'Sankhara',
    'PanchaKkhandha',
    'Anicca',
    'YonisoManasikara',
    'Sankharaloka',
    'Vedananupassana',
    'Kama',
    'Salayatana',
    'Dhatu18',
    'Upasamanussati',
    'SankappaRago',
];

const RECITATIONS_MATERIALS_LIST: MaterialKey[] = [
    'AllRecitations',
    'Namaskaras',
    'Qualities',
    'Veneration',
    'Confession',
    'Offering',
];

const createRoutingList = (materialsList: MaterialKey[]) => materialsList.map((key)=> createNewMaterialItem(key));

export const sermonsRoutingList:IMaterial[] = createRoutingList(SERMONS_MATERIALS_LIST);
export const recitationsRoutingList:IMaterial[] = createRoutingList(RECITATIONS_MATERIALS_LIST);