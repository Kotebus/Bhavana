import React from 'react';
import {Text, StyleSheet, ScrollView, Platform, TouchableOpacity} from 'react-native';
import {useTranslation} from "react-i18next";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";
import {FONT_SIZE_DEFAULT, FONT_SIZE_HEADER, globalStyles} from "@/components/styles/global";
import {SermonKey} from "@/components/i18n";
import {TextWithLink} from "@/components/TextWithLink";
import {ContactInfo} from "@/components/screens/about/ContactInfo";

type NavigateFuncType = () => Promise<void> | void;

interface IContentProps {
    onVipassanupakkilesaPress: NavigateFuncType;
    onPanchaNivaranaPress: NavigateFuncType;
    onRecitationsPress: NavigateFuncType;
    isRuLanguage: boolean
}

const MainContent = ({
                          onVipassanupakkilesaPress,
                          onPanchaNivaranaPress,
                          onRecitationsPress,
                         isRuLanguage,
                      }: IContentProps)=> {
    if (isRuLanguage) return (
        <>
            <Text style={styles.text}>
                Это приложение для медитации от монастыря Читтавивека (Шри-Ланка).
            </Text>
            <Text style={styles.text}>
                Цель этого приложения — обеспечить знакомство с медитацией в русле ортодоксального буддизма традиции тхеравада, как часть религиозной практики. Палийское слово «bhāvanā» означает «развитие ума», «очищение ума». Именно оно чаще всего переводится словом «медитация».
            </Text>
            <Text style={styles.text}>
                Вся информация из этого приложения основана на Трипитаке (палийском каноне) и проповедях бханте Ракване Ньянасихи — настоятеля буддийского лесного монастыря Читтавивека (Шри-Ланка), и доступна на <TextWithLink textStyle={styles.linkButtonText} url={'https://samatha-vipassana.com/'}>официальном сайте монастыря</TextWithLink>, а также в книге <TextWithLink textStyle={styles.linkButtonText} url={'https://samatha-vipassana.com/article/bhavana-art-of-the-mind-ru/bhavana-book/'}>«Bhāvanā — искусство ума»</TextWithLink>.
            </Text>
            <Text style={styles.text}>
                Для практики медитации важно найти себе компетентного учителя, желательно монаха, а также самому тщательно изучать Слово Будды. Важно изучать эти учения, запоминать их, обдумывать и пропускать через своё сердце. Если у вас возникают какие-то вопросы или сомнения — важно обращаться за помощью к учителю, или хотя бы к благим друзьям.
            </Text>
            <Text style={styles.text}>
                Обязательно ознакомьтесь с наиболее частыми ошибками в практике медитации в разделе <Text style={styles.linkButtonText} onPress={onVipassanupakkilesaPress}>«Vipassanupakkilesa: искажения прозрения»</Text>,
                а также с пятью помехами и методами их преодоления в разделе <Text style={styles.linkButtonText} onPress={onPanchaNivaranaPress}>«Pañca nīvaraṇāni: пять помех»</Text>.
            </Text>
            <Text style={styles.text}>
                Со славословиями звучащими в начале и конце сессии медитации, а также с их переводом, вы можете ознакомиться в секции <Text style={styles.linkButtonText} onPress={onRecitationsPress}>«Славословия»</Text>.
            </Text>
            <Text style={styles.text}>
                Дополнительная информация и ссылки на ресурсы монастыря и проч. представлены ниже.
            </Text>
            <Text style={styles.text}>
                Пусть заслуги от изучения этой Дхаммы помогут вам освободиться от всех страданий!
            </Text>
            <Text style={styles.citationText}>
                Этот путь называется прямым, направление, куда он ведет, называется бесстрашным.
            </Text>
            <TextWithLink
                textStyle={styles.linkButtonTextAlignedRight}
                url={'https://theravada.ru/Teaching/Canon/Suttanta/Texts/sn1_46-acchara-sutta-sv.htm'}>
                Аччхара сутта: Нимфы, СН 1.46
            </TextWithLink>
        </>
    );

    return (
        <>
            <Text style={styles.text}>
                This is a meditation app from the Chittaviveka Monastery (Sri Lanka).
            </Text>
            <Text style={styles.text}>
                The purpose of this application is to provide an introduction to meditation in the context of orthodox
                Buddhism of the Theravada tradition, as part of religious practice.
                The Pali word &#34;bhāvanā&#34; means &#34;development of the mind&#34; or &#34;purification of the
                mind.&#34; It is this term that is most often translated as &#34;meditation.&#34;
            </Text>
            <Text style={styles.text}>
                All information in this application is based on the Tipitaka (Pali Canon) and the sermons of Venerable
                Rakwane Gnanaseeha, the abbot of the Chittaviveka Buddhist Forest Monastery (Sri Lanka), and is available
                on the <TextWithLink textStyle={styles.linkButtonText} url={'https://samatha-vipassana.com/en'}>
                monastery&#39;s official website
            </TextWithLink>, as well as in the book <TextWithLink
                textStyle={styles.linkButtonText}
                url={'https://samatha-vipassana.com/en/article/bhavana-the-art-of-the-mind-en/bhavana-the-art-of-the-mind/'}>&#34;Bhāvanā - The Art of the Mind&#34;</TextWithLink>.
            </Text>
            <Text style={styles.text}>
                For meditation practice, it is critical to find a competent teacher, preferably a monk, and to diligently
                study the Word of the Buddha. It is essential to study these teachings, memorize them, contemplate them,
                and pass them through your heart. If you have any questions or doubts, it is important to seek help from
                a teacher or at least from good friends.
            </Text>
            <Text style={styles.text}>
                Be sure to familiarize yourself with the most common mistakes in meditation practice in the section <Text
                    style={styles.linkButtonText}
                    onPress={onVipassanupakkilesaPress}>&#34;Vipassanupakkilesa: distortions of insight,&#34;</Text>
                as well as the five hindrances and methods to overcome them in the section <Text style={styles.linkButtonText} onPress={onPanchaNivaranaPress}>&#34;Pañca nīvaraṇāni: five hindrances.&#34;</Text>
            </Text>
            <Text style={styles.text}>
                You can find the praises recited at the beginning and end of the meditation session, along with their translations, in the <Text style={styles.linkButtonText} onPress={onRecitationsPress}>&#34;Recitations&#34;</Text> section.
            </Text>
            <Text style={styles.text}>
                Additional information and links to monastery resources and more are provided below.
            </Text>
            <Text style={styles.text}>
                May the merits from studying this Dhamma help you be free from all suffering!
            </Text>
            <Text style={styles.citationText}>
                &#34;The straight way&#34; that path is called, and &#34;fearless&#34; is its destination.
            </Text>
            <TextWithLink textStyle={styles.linkButtonTextAlignedRight} url={'https://suttacentral.net/sn1.46/en/bodhi?lang=en'}>Accharāsutta: Nymphs (SN 1.46),</TextWithLink>
            <TextWithLink textStyle={styles.linkButtonTextAlignedRight} url={'https://suttacentral.net/sn1.46/en/bodhi?lang=en'}>translation by Ven. Bhikkhu Bodhi</TextWithLink>
        </>
    );
}


type Props = NativeStackScreenProps<RootStackParamList, 'AboutScreen'>;

export default function AboutScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();
    const languageNavigationParams = {language: language};

    const navigateToSermon = (sermonKey: SermonKey) => navigation.navigate('SermonScreen', {
        sermonKey: sermonKey,
        language: language
    });

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <Text style={styles.title}>
                    {t('AboutScreen')}
                </Text>
            )}

            <MainContent
                onRecitationsPress={() => navigateToSermon('Recitations')}
                onPanchaNivaranaPress={() => navigateToSermon('PanchaNivarana')}
                onVipassanupakkilesaPress={() => navigateToSermon('Vipassanupakkilesa')}
                isRuLanguage={language === 'ru'}
            />

            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('AboutTeacherScreen', languageNavigationParams)}
            >
                <Text style={globalStyles.buttonText}>
                    {t('AboutTeacherScreen')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('AboutMonasteryScreen', languageNavigationParams)}
            >
                <Text style={globalStyles.buttonText}>
                    {t('AboutMonasteryButton')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('LinksListScreen')}
            >
                <Text style={globalStyles.buttonText}>
                    {t('LinksListScreen')}
                </Text>
            </TouchableOpacity>

            <ContactInfo/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        paddingTop: 12,
        fontSize: FONT_SIZE_HEADER,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf:'flex-end'
    },
    text: {
        fontSize: FONT_SIZE_DEFAULT,
        marginBottom: 15,
        textAlign: 'justify',
    },
    citationText: {
        fontSize: FONT_SIZE_DEFAULT,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    contactsContainer: {
        width: '100%',
    },
    linkButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    linkButtonText: {
        fontSize: FONT_SIZE_DEFAULT,
        color: '#007AFF',
        textAlignVertical: 'center', // выравнивание по центру
        includeFontPadding: false,   // убирает лишние отступы Android
    },
    linkButtonTextAlignedRight: {
        fontSize: FONT_SIZE_DEFAULT,
        color: '#007AFF',
        alignSelf: 'flex-end',
    },
});