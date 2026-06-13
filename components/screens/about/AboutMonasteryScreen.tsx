import React from "react";
import {Platform, ScrollView, StyleSheet, Image} from "react-native";
import {useTranslation} from "react-i18next";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";
import {TitleText} from "@/components/screens/about/TitleText";
import {SimpleText} from "@/components/screens/about/SimpleText";
import {LinksList} from "@/components/common/LinksList";
import {RU_LANGUAGE} from "@/components/constatnts";
import {useSettings} from "@/components/contexts/SettingsContext";

const AboutMonasteryScreen = () => {
    const {settings} = useSettings();
    const language = settings.language;
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();
    const isRuLang = language === RU_LANGUAGE;

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <TitleText>
                    {t('AboutMonasteryTitle')}
                </TitleText>
            )}
            <Image
                style={styles.image}
                source={require('@/assets/images/chittaviveka.jpg')}
            />
            {isRuLang ? (
                <>
                    <SimpleText>
                        Монастырь «Читтавивека» — это монашеская обитель традиции Тхеравада, расположенная в самом сердце Шри-Ланки, в живописной местности с видом на озеро Виктория. Он не только предоставляет возможность изучения Дхаммы, но и играет важную роль в духовной жизни буддистов, укрепляя традиции, которые веками являются основой культурного наследия Шри-Ланки.
                    </SimpleText>
                    <SimpleText>
                        Основанный в 2018 году под руководством настоятеля бханте Ракване Нянасихи тхеро, монастырь стремится создать условия для глубокого изучения и практики Учения Будды для монахов и мирян, особенно для русскоязычных людей, не знающих иностранных языков. В монастыре они могут изучать и практиковать буддизм в привычной языковой среде. Это особенно важно для пожилых буддистов и родителей монахов и мирян, которым трудно адаптироваться в монастырях с другим языком общения.
                    </SimpleText>
                </>
            ) : (
                <>
                    <SimpleText>
                        Chittaviveka Monastery is a Theravāda Buddhist monastic community located in the heart of Sri Lanka, in a picturesque area overlooking Victoria Lake. It not only provides an opportunity to study the Dhamma but also plays a significant role in the spiritual life of Buddhists, preserving and strengthening traditions that have been the foundation of Sri Lanka’s cultural heritage for centuries.
                    </SimpleText>
                    <SimpleText>
                        Founded in 2018 under the guidance of Abbot Bhante Rakwane Gnanaseeha Thero, the monastery strives to create an environment for the in-depth study and practice of the Buddha’s teachings for both monks and laypeople. It is especially dedicated to Russian-speaking practitioners who do not know foreign languages, providing them with the opportunity to study and practice Buddhism in a familiar linguistic environment. This is particularly important for elderly Buddhists and the parents of monks and lay practitioners, who may find it difficult to adapt to monasteries where a different language is spoken.
                    </SimpleText>
                </>
            )}
            <LinksList data={[
                {
                    url: isRuLang ? 'https://samatha-vipassana.com/' : 'https://samatha-vipassana.com/',
                    text: t('WebSite')
                },
                {
                    url: isRuLang ? 'https://samatha-vipassana.com/donations/' : 'https://samatha-vipassana.com/en/donations/',
                    text: t('Donation')},
            ]}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
    },
});

export default AboutMonasteryScreen;