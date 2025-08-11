interface ISermon {
    id: number;
    sermonKey: string;
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
];

//Same key as in l18n/index.ts!
export type SermonKey = typeof sermonsRoutingList[number]['sermonKey'];
