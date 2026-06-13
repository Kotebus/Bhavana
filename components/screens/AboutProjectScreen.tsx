import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/common/AppNavigator";
import {useTranslation} from "react-i18next";
import {NavButton} from "@/components/common/NavButton";
import {Platform, ScrollView} from "react-native";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";

type Props = NativeStackScreenProps<RootStackParamList, 'AboutProjectScreen'>;

export default function AboutProjectScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();
    const isIos = Platform.OS === 'ios';

    const languageNavigationParams = {language: language};
    return (
        <ScrollView contentContainerStyle={globalStyles.contentContainerStyle}>
            <NavButton
                navigate={() => navigation.navigate('AboutScreen', languageNavigationParams)}>{t('AboutScreen')}</NavButton>
            <NavButton
                navigate={() => navigation.navigate('AboutTeacherScreen', languageNavigationParams)}>{t('AboutTeacherScreen')}</NavButton>
            <NavButton
                navigate={() => navigation.navigate('AboutSermonsScreen', languageNavigationParams)}>{t('AboutSermonsScreen')}</NavButton>
            <NavButton
                navigate={() => navigation.navigate('AboutMonasteryScreen', languageNavigationParams)}>{t('AboutMonasteryScreen')}</NavButton>
            <NavButton navigate={() => navigation.navigate('LinksListScreen')}>{t('LinksListScreen')}</NavButton>

            {isIos && (<NavButton navigate={() => navigation.goBack()}>{t('Back')}</NavButton>)}
        </ScrollView>
    );
}