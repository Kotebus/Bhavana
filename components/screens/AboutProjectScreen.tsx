import React from "react";
import {useTranslation} from "react-i18next";
import {router} from "expo-router";
import {NavButton} from "@/components/common/NavButton";
import {Platform, ScrollView} from "react-native";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";

export default function AboutProjectScreen() {
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();
    const isIos = Platform.OS === 'ios';

    return (
        <ScrollView contentContainerStyle={globalStyles.contentContainerStyle}>
            <NavButton navigate={() => router.navigate('/about')}>{t('AboutScreen')}</NavButton>
            <NavButton navigate={() => router.navigate('/about/teacher')}>{t('AboutTeacherScreen')}</NavButton>
            <NavButton navigate={() => router.navigate('/about/sermons')}>{t('AboutSermonsScreen')}</NavButton>
            <NavButton navigate={() => router.navigate('/about/monastery')}>{t('AboutMonasteryScreen')}</NavButton>
            <NavButton navigate={() => router.navigate('/about/links')}>{t('LinksListScreen')}</NavButton>

            {isIos && (<NavButton navigate={() => router.back()}>{t('Back')}</NavButton>)}
        </ScrollView>
    );
}
