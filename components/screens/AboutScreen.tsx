import React, {useCallback} from 'react';
import {Text, StyleSheet, ScrollView, Linking, View, TouchableOpacity} from 'react-native';
import {useTranslation} from "react-i18next";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";


const ContactInfo = () => {
    const {t} = useTranslation();

    const openTelegram = () => Linking.openURL('https://t.me/Max_Kotebus');
    const openEmail = () => Linking.openURL('mailto:kotebus666@gmail.com');

    return (
        <View style={styles.contactBlock}>
            <Text style={styles.contactLabel}>{t('contactDeveloper')}</Text>
            <View style={styles.contactRow}>
                <TouchableOpacity onPress={openTelegram}>
                    <Text style={styles.link}>tg @Max_Kotebus</Text>
                </TouchableOpacity>
                <Text style={styles.separator}>|</Text>
                <TouchableOpacity onPress={openEmail}>
                    <Text style={styles.link}>email</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

interface IOpenURLButtonProps {
    url: string;
    children: string;
}

const OpenURLButton = ({url, children}: IOpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        }
    }, [url]);

    return (
        <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
            <Text style={styles.linkButtonText}>{children}</Text>
        </TouchableOpacity>
    );
};

const RuContent = ()=> {
    return (
        <>
            <Text style={styles.title}>
                О приложении
            </Text>
            <Text style={styles.text}>
                Это приложение для медитации от монастыря Читтавивека (Шри-Ланка).
            </Text>
            <Text style={styles.text}>
                Основанный в 2018 году под руководством настоятеля бханте Ракване Нянасихи тхеро, монастырь стремится
                создать условия для глубокого изучения и практики Учения Будды для монахов и мирян, особенно для
                русскоязычных людей, не знающих иностранных языков. В монастыре они могут изучать и практиковать буддизм
                в привычной языковой среде. Это особенно важно для пожилых буддистов и родителей монахов и мирян,
                которым трудно адаптироваться в монастырях с другим языком общения.
            </Text>
        </>
    );
}

const EnContent = ()=> {
    return (
        <>
            <Text style={styles.title}>
                About the app
            </Text>
            <Text style={styles.text}>
                This is a meditation app from the Chittaviveka Monastery (Sri Lanka).
            </Text>
            <Text style={styles.text}>
                Founded in 2018 under the guidance of Abbot Bhante Rakwane Gnanaseeha Thero, the monastery strives to
                create an environment for the in-depth study and practice of the Buddha’s teachings for both monks and
                laypeople. It is especially dedicated to Russian-speaking practitioners who do not know foreign
                languages, providing them with the opportunity to study and practice Buddhism in a familiar linguistic
                environment. This is particularly important for elderly Buddhists and the parents of monks and lay
                practitioners, who may find it difficult to adapt to monasteries where a different language is spoken.
            </Text>
        </>
    );
}

type Props = NativeStackScreenProps<RootStackParamList, 'AboutScreen'>;

export default function AboutScreen({ route } : Props) {
    const {language} = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {language === 'ru'
                ? <RuContent/>
                : <EnContent/>
            }

            <View style={styles.contactsContainer}>
                <OpenURLButton url={'https://theravada.ru/'}>theravada.ru</OpenURLButton>
                <OpenURLButton url={'https://samatha-vipassana.com/'}>samatha-vipassana.com</OpenURLButton>
                <OpenURLButton url={'http://t.me/chittaviveka'}>Telegram: @chittaviveka</OpenURLButton>
                <OpenURLButton url={'https://www.instagram.com/chittaviveka.monastery'}>Instagram:
                    @chittaviveka</OpenURLButton>
                <OpenURLButton url={'https://www.facebook.com/chittaviveka'}>Facebook: Chittaviveka
                    Monastery</OpenURLButton>
                <OpenURLButton url={'https://www.youtube.com/@ChittaViveka'}>Youtube Буддизм Тхеравада</OpenURLButton>
                <OpenURLButton url={'https://vk.com/dhammatheravada'}>VK Dhamma Theravada</OpenURLButton>
            </View>

            <ContactInfo/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        alignItems: 'center',
    },
    title: {
        paddingTop: 12,
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15,
        alignSelf:'flex-end'
    },
    text: {
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'justify',
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
        fontSize: 16,
        color: '#007AFF',
    },
    contactBlock: {
        marginTop: 20,
        alignItems: 'center',
    },
    contactLabel: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    link: {
        fontSize: 16,
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    separator: {
        marginHorizontal: 8,
        fontSize: 16,
        color: '#888',
    },
});