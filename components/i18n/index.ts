import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const materialsEn = {
    PanchaNivarana: 'Pañca nīvaraṇāni: Five Hindrances',
    SantaSukha: 'Santasukha: the Happiness of Peace',
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
    AllRecitations: 'All Recitations',
    Namaskaras: 'Namasakāras',
    Qualities: 'Qualities of the Three Jewels',
    Veneration: 'Expression of Veneration for the Relics and Bodhi tree',
    Confession: ' Confession of Faults before the Three Jewels',
    Offering: 'Offering of Practice to the Three Jewels (after meditation)',
};

const materialsRu = {
    PanchaNivarana: 'Pañca nīvaraṇāni: пять помех',
    SantaSukha: 'Santasukha: счастье покоя',
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
    AllRecitations: 'Все славословия',
    Namaskaras: 'Намаскары',
    Qualities: 'Памятование о качествах Трёх Драгоценностей',
    Veneration: 'Выражение почтения святыням и древу Бодхи',
    Confession: 'Прошение прощения у Трёх Драгоценностей',
    Offering: 'Подношение практики Трём Драгоценностям (после медитации)',
};

export type MaterialKey = keyof typeof materialsEn;

const sectionAboutEn = {
    AboutScreen: 'About app',
    AboutTeacherScreen: 'About teacher',
    AboutSermonsScreen: 'About materials in the application',
    AboutMonasteryScreen: 'Chittaviveka Monastery',
    LinksListScreen: 'Links',
}
const sectionAboutRu = {
    AboutScreen: 'О приложении',
    AboutTeacherScreen: 'Об учителе',
    AboutSermonsScreen: 'О проповедях в приложении',
    AboutMonasteryScreen: 'Монастырь Читтавивека',
    LinksListScreen: 'Ссылки',
}

//export type AboutSectionKey = keyof typeof sectionAboutEn;

const resources = {
    en: {
        translation: {
            setTimeHeader: 'Set time',
            min: 'min',
            hour: 'h',
            start: 'Start',
            endSession: 'End session',
            HomeScreen: 'Bhāvanā — Art of The Mind',
            StudyScreen: 'Study',
            MeditationScreen: 'Meditation',
            SettingsScreen: 'Settings',
            Recitations: 'Recitations',
            Language: 'Language',
            Sound: 'Sound',
            RecitationsHint: 'only during sessions of {{minutes}} minutes or more',
            RecitationsReadBy: 'Recited by',
            contactDeveloper: 'Developer:',
            AboutMonasteryTitle: 'Chittaviveka Monastery in Sri Lanka',
            TeacherName: 'Ven. Rakwane Gnanaseeha',
            BhanteAsankhataName: 'Ven. Asankhata Russiave',
            blessings: 'By the power of this truth, may you be safe and well!',
            MyNameIs: 'Maksim Suleymanov',
            Donation: 'Donations',
            DownloadBook: 'Download book «Bhāvanā — The Art of The Mind» by Venerable Rakwane Gnanaseeha',
            WebSite: 'Official website',
            Back: 'Back',

            AboutProjectScreen: 'About project',
            //Section about project
            ...sectionAboutEn,

            //Sermons and recitations (aka materials)
            ...materialsEn,
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
            StudyScreen: 'Материалы',
            MeditationScreen: 'Медитация',
            SettingsScreen: 'Настройки',
            Recitations: 'Славословия',
            RecitationsReadBy: 'Славословия читает',
            Language: 'Язык',
            Sound: 'Звук',
            RecitationsHint: ' только при сессиях от {{minutes}} минут',
            contactDeveloper: 'Разработчик:',
            AboutMonasteryTitle: 'Монастырь Читтавивека на Шри-Ланке',
            TeacherName: 'Бхиккху Ракване Ньянасиха',
            BhanteAsankhataName: 'Бхиккху Асанкхата Руссиаве',
            blessings: 'Пусть силой этой правды будет вам благополучие!',
            MyNameIs: 'Максим Сулейманов',
            Donation: 'Пожертвования',
            DownloadBook: 'Скачать книгу «Bhāvanā — искусство ума»',
            WebSite: 'Официальный сайт монастыря',
            Back: 'Назад',

            AboutProjectScreen: 'О проекте',
            //Section about project
            ...sectionAboutRu,

            //Sermons and recitations (aka materials)
            ...materialsRu,
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