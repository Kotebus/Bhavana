import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const sermonsEn = {
    PanchaNivarana: 'Pañca nīvaraṇāni: Five Hindrances',
    SantaSukha: 'Santasukha: the Happiness of Peace',
};

const sermonsRu = {
    PanchaNivarana: 'Pañca nīvaraṇāni: пять помех',
    SantaSukha: 'Santasukha: счастье покоя',
};

export type SermonKey = keyof typeof sermonsEn;

const resources = {
    en: {
        translation: {
            setTimeHeader: 'Set time',
            min: 'min',
            hour: 'h',
            start: 'Start',
            endSession: 'End session',
            HomeScreen: 'Bhāvanā — The Art of The Mind',
            AboutScreen: 'About',
            StudyScreen: 'Study',
            MeditationScreen: 'Meditation',

            //Sermons, same keys as in sermonsRoutingList!
            ...sermonsEn,
            // PanchaNivarana: 'Pañca nīvaraṇāni: Five Hindrances',
            // SantaSukha: 'Santasukha: the Happiness of Peace',
        },
    },
    ru: {
        translation: {
            setTimeHeader: 'Выберите время',
            min: 'мин',
            hour: 'ч',
            start: 'Старт',
            endSession: 'Закончить сессию',
            HomeScreen: 'Bhāvanā — искусство ума',
            AboutScreen: 'О приложении',
            StudyScreen: 'Материалы',
            MeditationScreen: 'Медитация',
            //Sermons, same keys as in sermonsRoutingList!
            ...sermonsRu,
        },
    },
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v4',
        lng: 'ru',
        fallbackLng: 'ru',
        resources,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;