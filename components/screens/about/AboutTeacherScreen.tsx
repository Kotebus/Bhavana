import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/common/AppNavigator";
import {Image, Platform, ScrollView, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";
import {TitleText} from "@/components/screens/about/TitleText";
import {SimpleText} from "@/components/screens/about/SimpleText";
import {RU_LANGUAGE} from "@/components/constatnts";

type Props = NativeStackScreenProps<RootStackParamList, 'AboutTeacherScreen'>;

export const AboutTeacherScreen = ({ route }: Props) => {
    const { language } = route.params;
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <TitleText>
                    {t('AboutTeacherScreen')}
                </TitleText>
            )}
            <Image
                style={styles.image}
                source={require('@/assets/images/teacher.jpg')}
            />
            {/*<Image*/}
            {/*    style={styles.image}*/}
            {/*    source={require('@/assets/images/teacher2.jpg')}*/}
            {/*/>*/}
            {language === RU_LANGUAGE ? (
                <>
                    <SimpleText>
                        Достопочтенный бханте Ракване Нянасиха тхера, буддийский монах в традиции тхеравада и настоятель лесного монастыря Читтавивека, принял монашеский постриг в 2003 году на Шри-Ланке в возрасте 24 лет под руководством достопочтенного трипитака ачарии Патекады Суманатиссы махатхеры из линии Сиам Никая Шри Рохана Паршавайя (Siam Nikaya Sri Rohana Parshavaya).
                    </SimpleText>
                    <SimpleText>
                        В 2008 году бханте при поддержке достопочтенного саду Паллекандде Ратнасары махатхеры отправился учиться в Россию и поступил в Университет Дружбы Народов в Москве, где в 2013 году получил степень бакалавра по филологии русского языка. Позднее он продолжил образование в Калмыцком государственном университете, где в 2015 году завершил магистратуру по тому же направлению.
                    </SimpleText>
                    <SimpleText>
                        В 2018 году бханте основал монастырь Читтавивека. В 2024 году под его руководством находились 12 учеников-монахов, в том числе 9 русскоязычных. С 2019 года бханте проводит медитационные затворы для русскоязычных практикующих на Шри-Ланке.
                    </SimpleText>
                    <SimpleText>
                        Также бханте регулярно посещает Россию, где дает учения, проводит затворы и поддерживает общение с русскоязычными буддистами и людьми, интересующимися медитацией и Учением Будды. Многие его лекции можно найти на YouTube и в сети интернет (в том числе под именем «Нянасиха»).
                    </SimpleText>
                </>
            ) : (
                <>
                    <SimpleText>
                        The Venerable Bhante Rakwane Gnanaseeha Thera, a Buddhist monk in the Theravada tradition and abbot of Chittaviveka Forest Monastery, took monastic precepts in 2003 in Sri Lanka at the age of 24 under the guidance of the Venerable Tripitaka Ācāriya Patekkada Sumanatissa Mahāthera from the lineage of Siam Nikaya Sri Rohana Parshavaya.
                    </SimpleText>
                    <SimpleText>
                        In 2008, with the support of the Venerable Sadhu Pallekande Ratnasara Mahāthera, Bhante went to study in Russia and enrolled at the Peoples&#39; Friendship University of Russia in Moscow, where he received a bachelor&#39;s degree in Russian Philology in 2013. Later, he continued his education at Kalmyk State University, where he completed his master&#39;s degree in the same field in 2015.
                    </SimpleText>
                    <SimpleText>
                        In 2018, Bhante founded the Chittaviveka Monastery. At the time of this book&#39;s publication, he had 12 disciple-monks under his guidance, including 9 Russian-speaking disciples. Since 2019, he has been conducting meditation retreats for Russian-speaking practitioners in Sri Lanka.
                    </SimpleText>
                    <SimpleText>
                        Bhante also regularly visits Russia and other countries, where he gives teachings, conducts retreats, and maintains communication with Buddhists and individuals interested in meditation and the Buddha&#39;s teachings. Many of his lectures can be found on YouTube and on the Internet.
                    </SimpleText>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: '100%',
    },
});