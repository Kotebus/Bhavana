import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";
import {useTranslation} from "react-i18next";
import {Platform, ScrollView} from "react-native";
import {globalStyles} from "@/components/styles/global";
import BackNavHeader from "@/components/BackNavHeader";
import {NavButton} from "@/components/NavButton";


type Props = NativeStackScreenProps<RootStackParamList, 'AboutProjectScreen'>;

export default function AboutProjectScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();

    const languageNavigationParams = {language: language};
    const isIos = Platform.OS === 'ios';
    return (
        <ScrollView contentContainerStyle={globalStyles.contentContainerStyle}>
            {isIos && <BackNavHeader onBack={() => navigation.goBack()}/>}

            <NavButton navigate={() => navigation.navigate('AboutScreen', languageNavigationParams)} >{t('AboutScreen')}</NavButton>
            <NavButton navigate={() => navigation.navigate('AboutTeacherScreen', languageNavigationParams)} >{t('AboutTeacherScreen')}</NavButton>
            <NavButton navigate={() => navigation.navigate('AboutSermonsScreen', languageNavigationParams)} >{t('AboutSermonsScreen')}</NavButton>
            <NavButton navigate={() => navigation.navigate('AboutMonasteryScreen', languageNavigationParams)} >{t('AboutMonasteryScreen')}</NavButton>
            <NavButton navigate={() => navigation.navigate('LinksListScreen')} >{t('LinksListScreen')}</NavButton>
        </ScrollView>
    );
}