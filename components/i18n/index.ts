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
//export type LocalisationKey = keyof typeof resources.en.translation;

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
            SettingsScreen: 'Settings',
            Language: 'Language',
            Sound: 'Sound',
            RecitationsHint: 'only during sessions of {{minutes}} minutes or more',
            LinksListScreen: 'Links',
            contactDeveloper: 'Developer:',
            AboutProjectScreen: 'About project',
            AboutMonasteryScreen: 'Chittaviveka Monastery in Sri Lanka',
            AboutMonasteryButton: 'Chittaviveka Monastery',
            TeacherName: 'Venerable Rakwane Gnanaseeha',
            AboutTeacherScreen: 'About teacher',
            AboutSermonsScreen: 'About sermons in the application',
            blessings: 'By the power of this truth, may you be safe and well!',
            MyNameIs: 'Maksim Suleymanov',
            Donation: 'Donations',
            DownloadBook: 'Download book «Bhāvanā — The Art of The Mind» by Venerable Rakwane Gnanaseeha',
            WebSite: 'Official website',

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
            SettingsScreen: 'Настройки',
            Language: 'Язык',
            Sound: 'Звук',
            RecitationsHint: ' только при сессиях от {{minutes}} минут',
            LinksListScreen: 'Сслыки',
            contactDeveloper: 'Разработчик:',
            AboutProjectScreen: 'О проекте',
            AboutMonasteryScreen: 'Монастырь Читтавивека на Шри-Ланке',
            AboutMonasteryButton: 'Монастырь Читтавивека',
            TeacherName: 'Бхиккху Ракване Ньянасиха',
            AboutTeacherScreen: 'Об учителе',
            AboutSermonsScreen: 'О проповедях в приложении',
            blessings: 'Пусть силой этой правды будет вам благополучие!',
            MyNameIs: 'Максим Сулейманов',
            Donation: 'Пожертвования',
            DownloadBook: 'Скачать книгу «Bhāvanā — искусство ума»',
            WebSite: 'Официальный сайт монастыря',

            //Sermons, same keys as in sermonsRoutingList!
            ...sermonsRu,
        },
    },
};

// eslint-disable-next-line import/no-named-as-default-member
void i18n
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