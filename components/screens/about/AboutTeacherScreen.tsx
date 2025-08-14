import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";
import {Image, Platform, ScrollView, StyleSheet, Text} from "react-native";
import {FONT_SIZE_DEFAULT, FONT_SIZE_HEADER, globalStyles} from "@/components/styles/global";
import {useTranslation} from "react-i18next";

type Props = NativeStackScreenProps<RootStackParamList, 'AboutTeacherScreen'>;

export const AboutTeacherScreen = ({ route }: Props) => {
    const { language } = route.params;
    const {t} = useTranslation();

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <Text style={styles.title}>
                    {t('AboutTeacherScreen')}
                </Text>
            )}
            <Image
                style={styles.image}
                source={require('@/assets/images/teacher.jpg')}
            />
            {/*<Image*/}
            {/*    style={styles.image}*/}
            {/*    source={require('@/assets/images/teacher2.jpg')}*/}
            {/*/>*/}
            {language === 'ru' ? (
                <>
                    <Text style={styles.text}>
                        Достопочтенный бханте Ракване Нянасиха тхера, буддийский монах в традиции тхеравада и настоятель лесного монастыря Читтавивека, принял монашеский постриг в 2003 году на Шри-Ланке в возрасте 24 лет под руководством достопочтенного трипитака ачарии Патекады Суманатиссы махатхеры из линии Сиам Никая Шри Рохана Паршавайя (Siam Nikaya Sri Rohana Parshavaya).
                    </Text>
                    <Text style={styles.text}>
                        В 2008 году бханте при поддержке достопочтенного саду Паллекандде Ратнасары махатхеры отправился учиться в Россию и поступил в Университет Дружбы Народов в Москве, где в 2013 году получил степень бакалавра по филологии русского языка. Позднее он продолжил образование в Калмыцком государственном университете, где в 2015 году завершил магистратуру по тому же направлению.
                    </Text>
                    <Text style={styles.text}>
                        В 2018 году бханте основал монастырь Читтавивека. В 2024 году под его руководством находились 12 учеников-монахов, в том числе 9 русскоязычных. С 2019 года бханте проводит медитационные затворы для русскоязычных практикующих на Шри-Ланке.
                    </Text>
                    <Text style={styles.text}>
                        Также бханте регулярно посещает Россию, где дает учения, проводит затворы и поддерживает общение с русскоязычными буддистами и людьми, интересующимися медитацией и Учением Будды. Многие его лекции можно найти на YouTube и в сети интернет (в том числе под именем «Нянасиха»).
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.text}>
                        The Venerable Bhante Rakwane Gnanaseeha Thera, a Buddhist monk in the Theravada tradition and abbot of Chittaviveka Forest Monastery, took monastic precepts in 2003 in Sri Lanka at the age of 24 under the guidance of the Venerable Tripitaka Ācāriya Patekkada Sumanatissa Mahāthera from the lineage of Siam Nikaya Sri Rohana Parshavaya.
                    </Text>
                    <Text style={styles.text}>
                        In 2008, with the support of the Venerable Sadhu Pallekande Ratnasara Mahāthera, Bhante went to study in Russia and enrolled at the Peoples' Friendship University of Russia in Moscow, where he received a bachelor's degree in Russian Philology in 2013. Later, he continued his education at Kalmyk State University, where he completed his master's degree in the same field in 2015.
                    </Text>
                    <Text style={styles.text}>
                        In 2018, Bhante founded the Chittaviveka Monastery. At the time of this book's publication, he had 12 disciple-monks under his guidance, including 9 Russian-speaking disciples. Since 2019, he has been conducting meditation retreats for Russian-speaking practitioners in Sri Lanka.
                    </Text>
                    <Text style={styles.text}>
                        Bhante also regularly visits Russia and other countries, where he gives teachings, conducts retreats, and maintains communication with Buddhists and individuals interested in meditation and the Buddha's teachings. Many of his lectures can be found on YouTube and on the Internet.
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