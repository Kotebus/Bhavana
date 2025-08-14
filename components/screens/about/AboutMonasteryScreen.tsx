import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";
import {Platform, ScrollView, StyleSheet, Text, Image} from "react-native";
import {FONT_SIZE_DEFAULT, FONT_SIZE_HEADER, globalStyles} from "@/components/styles/global";
import {useTranslation} from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, 'AboutMonasteryScreen'>;

//TODO: cleanup deps in package json!

export const AboutMonasteryScreen = ({ route }: Props) => {
    const { language } = route.params;
    const {t} = useTranslation();

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <Text style={styles.title}>
                    {t('AboutMonasteryScreen')}
                </Text>
            )}
            <Image
                style={styles.image}
                source={require('@/assets/images/chittaviveka.jpg')}
            />
            {language === 'ru' ? (
                <>
                    <Text style={styles.text}>
                        Монастырь «Читтавивека» — это монашеская обитель традиции Тхеравада, расположенная в самом сердце Шри-Ланки, в живописной местности с видом на озеро Виктория. Он не только предоставляет возможность изучения Дхаммы, но и играет важную роль в духовной жизни буддистов, укрепляя традиции, которые веками являются основой культурного наследия Шри-Ланки.
                    </Text>
                    <Text style={styles.text}>
                        Основанный в 2018 году под руководством настоятеля бханте Ракване Нянасихи тхеро, монастырь стремится создать условия для глубокого изучения и практики Учения Будды для монахов и мирян, особенно для русскоязычных людей, не знающих иностранных языков. В монастыре они могут изучать и практиковать буддизм в привычной языковой среде. Это особенно важно для пожилых буддистов и родителей монахов и мирян, которым трудно адаптироваться в монастырях с другим языком общения.
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.text}>
                        Chittaviveka Monastery is a Theravāda Buddhist monastic community located in the heart of Sri Lanka, in a picturesque area overlooking Victoria Lake. It not only provides an opportunity to study the Dhamma but also plays a significant role in the spiritual life of Buddhists, preserving and strengthening traditions that have been the foundation of Sri Lanka’s cultural heritage for centuries.
                    </Text>
                    <Text style={styles.text}>
                        Founded in 2018 under the guidance of Abbot Bhante Rakwane Gnanaseeha Thero, the monastery strives to create an environment for the in-depth study and practice of the Buddha’s teachings for both monks and laypeople. It is especially dedicated to Russian-speaking practitioners who do not know foreign languages, providing them with the opportunity to study and practice Buddhism in a familiar linguistic environment. This is particularly important for elderly Buddhists and the parents of monks and lay practitioners, who may find it difficult to adapt to monasteries where a different language is spoken.
                    </Text>
                </>
            )}
        </ScrollView>
    );
}

//TODO: make global styles for AboutScreen and this one screen
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
    image: {
        flex: 1,
        width: '100%',
    },
});