import React from 'react';
import {Text, ScrollView, Platform} from 'react-native';
import {useTranslation} from "react-i18next";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/common/AppNavigator";
import {globalStyles} from "@/components/styles/global";
import {MaterialKey} from "@/components/i18n";
import {TextWithLink, textWithLinkStyles} from "@/components/common/TextWithLink";
import {ContactInfo} from "@/components/screens/about/ContactInfo";
import {SimpleText} from "@/components/screens/about/SimpleText";
import {CitationText} from "@/components/screens/about/CitationText";
import {TitleText} from "@/components/screens/about/TitleText";
import {RU_LANGUAGE} from "@/components/constatnts";

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
            <SimpleText>
                Это приложение для медитации от монастыря Читтавивека (Шри-Ланка).
            </SimpleText>
            <SimpleText>
                Цель этого приложения — обеспечить знакомство с медитацией в русле ортодоксального буддизма традиции тхеравада, как часть религиозной практики. Палийское слово «bhāvanā» означает «развитие ума», «очищение ума». Именно оно чаще всего переводится словом «медитация».
            </SimpleText>
            <SimpleText>
                Вся информация из этого приложения основана на Трипитаке (палийском каноне) и проповедях бханте Ракване Ньянасихи — настоятеля буддийского лесного монастыря Читтавивека (Шри-Ланка), и доступна на <TextWithLink url={'https://samatha-vipassana.com/'}>официальном сайте монастыря</TextWithLink>, а также в книге <TextWithLink url={'https://samatha-vipassana.com/article/bhavana-art-of-the-mind-ru/bhavana-book/'}>«Bhāvanā — искусство ума»</TextWithLink>.
            </SimpleText>
            <SimpleText>
                Для практики медитации важно найти себе компетентного учителя, желательно монаха, а также самому тщательно изучать Слово Будды. Важно изучать эти учения, запоминать их, обдумывать и пропускать через своё сердце. Если у вас возникают какие-то вопросы или сомнения — важно обращаться за помощью к учителю, или хотя бы к благим друзьям.
            </SimpleText>
            <SimpleText>
                Обязательно ознакомьтесь с наиболее частыми ошибками в практике медитации в разделе <Text style={textWithLinkStyles.linkButtonText} onPress={onVipassanupakkilesaPress}>«Vipassanupakkilesa: искажения прозрения»</Text>,
                а также с пятью помехами и методами их преодоления в разделе <Text style={textWithLinkStyles.linkButtonText} onPress={onPanchaNivaranaPress}>«Pañca nīvaraṇāni: пять помех»</Text>.
            </SimpleText>
            <SimpleText>
                Со славословиями звучащими в начале и конце сессии медитации, а также с их переводом, вы можете ознакомиться в секции <Text style={textWithLinkStyles.linkButtonText} onPress={onRecitationsPress}>«Славословия»</Text>.
            </SimpleText>
            <SimpleText>
                Дополнительная информация и ссылки на ресурсы монастыря и проч. представлены ниже.
            </SimpleText>
            <SimpleText>
                Пусть заслуги от изучения этой Дхаммы помогут вам освободиться от всех страданий!
            </SimpleText>
            <CitationText>
                Этот путь называется прямым, направление, куда он ведет, называется бесстрашным.
            </CitationText>
            <TextWithLink
                isRightAligned={true}
                url={'https://theravada.ru/Teaching/Canon/Suttanta/Texts/sn1_46-acchara-sutta-sv.htm'}>
                Аччхара сутта: Нимфы, СН 1.46
            </TextWithLink>
        </>
    );

    return (
        <>
            <SimpleText>
                This is a meditation app from the Chittaviveka Monastery (Sri Lanka).
            </SimpleText>
            <SimpleText>
                The purpose of this application is to provide an introduction to meditation in the context of orthodox
                Buddhism of the Theravada tradition, as part of religious practice.
                The Pali word &#34;bhāvanā&#34; means &#34;development of the mind&#34; or &#34;purification of the
                mind.&#34; It is this term that is most often translated as &#34;meditation.&#34;
            </SimpleText>
            <SimpleText>
                All information in this application is based on the Tipitaka (Pali Canon) and the sermons of Venerable
                Rakwane Gnanaseeha, the abbot of the Chittaviveka Buddhist Forest Monastery (Sri Lanka), and is available
                on the <TextWithLink url={'https://samatha-vipassana.com/en'}>
                monastery&#39;s official website
            </TextWithLink>, as well as in the book <TextWithLink
                url={'https://samatha-vipassana.com/en/article/bhavana-the-art-of-the-mind-en/bhavana-the-art-of-the-mind/'}>&#34;Bhāvanā - The Art of the Mind&#34;</TextWithLink>.
            </SimpleText>
            <SimpleText>
                For meditation practice, it is critical to find a competent teacher, preferably a monk, and to diligently
                study the Word of the Buddha. It is essential to study these teachings, memorize them, contemplate them,
                and pass them through your heart. If you have any questions or doubts, it is important to seek help from
                a teacher or at least from good friends.
            </SimpleText>
            <SimpleText>
                Be sure to familiarize yourself with the most common mistakes in meditation practice in the section <Text
                    style={textWithLinkStyles.linkButtonText}
                    onPress={onVipassanupakkilesaPress}>&#34;Vipassanupakkilesa: distortions of insight,&#34;</Text>
                as well as the five hindrances and methods to overcome them in the section <Text style={textWithLinkStyles.linkButtonText} onPress={onPanchaNivaranaPress}>&#34;Pañca nīvaraṇāni: five hindrances.&#34;</Text>
            </SimpleText>
            <SimpleText>
                You can find the praises recited at the beginning and end of the meditation session, along with their translations, in the <Text style={textWithLinkStyles.linkButtonText} onPress={onRecitationsPress}>&#34;Recitations&#34;</Text> section.
            </SimpleText>
            <SimpleText>
                Additional information and links to monastery resources and more are provided below.
            </SimpleText>
            <SimpleText>
                May the merits from studying this Dhamma help you be free from all suffering!
            </SimpleText>
            <CitationText>
                &#34;The straight way&#34; that path is called, and &#34;fearless&#34; is its destination.
            </CitationText>
            <TextWithLink isRightAligned={true} url={'https://suttacentral.net/sn1.46/en/bodhi?lang=en'}>Accharāsutta: Nymphs (SN 1.46),</TextWithLink>
            <TextWithLink isRightAligned={true} url={'https://suttacentral.net/sn1.46/en/bodhi?lang=en'}>translation by Ven. Bhikkhu Bodhi</TextWithLink>
        </>
    );
}


type Props = NativeStackScreenProps<RootStackParamList, 'AboutScreen'>;

export default function AboutScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();

    const navigateToSermon = (materialKey: MaterialKey) =>
        navigation.navigate('MaterialScreen', {materialKey, language});

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <TitleText>
                    {t('AboutScreen')}
                </TitleText>
            )}

            <MainContent
                onRecitationsPress={() => navigateToSermon('AllRecitations')}
                onPanchaNivaranaPress={() => navigateToSermon('PanchaNivarana')}
                onVipassanupakkilesaPress={() => navigateToSermon('Vipassanupakkilesa')}
                isRuLanguage={language === RU_LANGUAGE}
            />

            <ContactInfo/>
        </ScrollView>
    );
}