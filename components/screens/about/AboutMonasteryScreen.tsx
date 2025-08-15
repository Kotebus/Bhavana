import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";
import {Platform, ScrollView, StyleSheet, Image} from "react-native";
import {globalStyles} from "@/components/styles/global";
import {useTranslation} from "react-i18next";
import {TitleText} from "@/components/screens/about/TitleText";
import {SimpleText} from "@/components/screens/about/SimpleText";
import {TextWithLink} from "@/components/TextWithLink";

type Props = NativeStackScreenProps<RootStackParamList, 'AboutMonasteryScreen'>;

//TODO: cleanup deps in package json!

export const AboutMonasteryScreen = ({ route }: Props) => {
    const { language } = route.params;
    const {t} = useTranslation();
    const isRuLang = language === 'ru';

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <TitleText>
                    {t('AboutMonasteryScreen')}
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
            <TextWithLink url={isRuLang ? 'https://samatha-vipassana.com/donations/' : 'https://samatha-vipassana.com/en/donations/'}>{t('Donation')}</TextWithLink>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
    },
});