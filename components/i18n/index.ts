import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const sermonsEn = {
    PanchaNivarana: 'Pañca nīvaraṇāni: Five Hindrances',
    SantaSukha: 'Santasukha: the Happiness of Peace',
    Recitations: 'Recitations',
    DanaSilaBhavana: 'Dāna, sīla, bhāvanā: The Three Types of Practice in Buddhism',
    Salayatana: 'Saḷāyatana: Six Sense Spheres',
    Viveka: 'Viveka: Rest',
    Sankhara: 'Saṅkhāra: Mental Formations',
    PanchaKkhandha: 'Pañcakkhandhā: The Five Aggregates',
    Anicca: 'Anicca: Impermanence',
    YonisoManasikara: 'Yoniso manasikāra: The Wise Contemplation',
    Vipassanupakkilesa: 'Vipassanupakkilesa: The Imperfections of Insight',
    Sankharaloka: 'Saṅkhāra loka: The World of Mental Formations',
    Vedananupassana: 'Vedanānupassanā: Observation of Sensations',
    Kama: 'Kāma: Sensual Pleasures',
    Dhatu18: 'Aṭṭhārasa dhātuyo: Eighteen Elements',
    Upasamanussati: 'Upasamānussati: Recollection of The Peace of Nibbāna',
    SankappaRago: 'Saṅkappa rāgo purisassa kāmo',
};

const sermonsRu = {
    PanchaNivarana: 'Pañca nīvaraṇāni: пять помех',
    SantaSukha: 'Santasukha: счастье покоя',
    Recitations: 'Славословия',
    DanaSilaBhavana: 'Dāna, sīla, bhāvanā: три вида практики в буддизме',
    Salayatana: 'Saḷāyatana: шесть сфер восприятия',
    Viveka: 'Viveka: отдых',
    Sankhara: 'Saṅkhāra: формации ума',
    PanchaKkhandha: 'Pañcakkhandhā: пять совокупностей',
    Anicca: 'Anicca: непостоянство',
    YonisoManasikara: 'Yoniso manasikāra: мудрое размышление',
    Vipassanupakkilesa: 'Vipassanupakkilesa: искажения прозрения',
    Sankharaloka: 'Saṅkhāra loka: мир формаций ума',
    Vedananupassana: 'Vedanānupassanā: наблюдение ощущений',
    Kama: 'Kāma: чувственные удовольствия',
    Dhatu18: 'Aṭṭhārasa dhātuyo: восемнадцать элементов',
    Upasamanussati: 'Upasamānussati: памятование о покое Ниббаны',
    SankappaRago: 'Saṅkappa rāgo purisassa kāmo',
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
            HomeScreen: 'Bhāvanā — Art of The Mind',
            AboutScreen: 'About',
            StudyScreen: 'Study',
            MeditationScreen: 'Meditation',
            contactDeveloper: 'Developer: Max Suleimanov',

            //Sermons, same keys as in sermonsRoutingList!
            ...sermonsEn,
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
            contactDeveloper: 'Разработчик: Макс Сулейманов',

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