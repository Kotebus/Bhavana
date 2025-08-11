import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import PanchaNivaranaScreen from "../screens/sermons/PanchaNivaranaScreen";

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
            PanchaNivaranaScreen: 'Pañca nīvaraṇāni: Five Hindrances',
            SantaSukhaScreen: 'Santasukha: the Happiness of Peace',
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
            PanchaNivaranaScreen: 'Pañca nīvaraṇāni: пять помех',
            SantaSukhaScreen: 'Santasukha: счастье покоя',
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
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import PanchaNivaranaScreen from "../screens/sermons/PanchaNivaranaScreen";

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
            PanchaNivaranaScreen: 'Pañca nīvaraṇāni: Five Hindrances',
            SantaSukhaScreen: 'Santasukha: the Happiness of Peace',
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
            PanchaNivaranaScreen: 'Pañca nīvaraṇāni: пять помех',
            SantaSukhaScreen: 'Santasukha: счастье покоя',
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