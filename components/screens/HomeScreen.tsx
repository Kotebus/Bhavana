import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { useTranslation } from 'react-i18next';
import {router} from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';

import {FONT_SIZE_HEADER} from "../styles/global";
import {useGlobalStyles} from "../styles/useThemedStyles";
import TimePicker from "@/components/common/TimePicker";
import {ITime} from "@/components/storage/storage";
import {useSettings} from "@/components/contexts/SettingsContext";
import {LanguageToggle} from "@/components/common/LanguageToggle";
import {NavButton} from "@/components/common/NavButton";
import {ThemeToggle} from "@/components/common/ThemeToggle";

export default function HomeScreen() {
    const {settings, setSettings, inited} = useSettings();
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();

    const updateTime = (newTime: ITime) =>
        setSettings({...settings, meditationTime: newTime});

    const toggleSound = () =>
        setSettings({...settings, soundEnabled: !settings.soundEnabled});

    return (
        <ScrollView contentContainerStyle={globalStyles.contentContainerStyle}>
            {/* Верхняя панель с иконками */}
            <View style={styles.topBar}>
                <ThemeToggle style={globalStyles.iconButton} size={24}/>

                <TouchableOpacity onPress={toggleSound} style={globalStyles.iconButton}>
                    <Ionicons
                        name={settings.soundEnabled ? 'volume-high' : 'volume-mute'}
                        size={28}
                        color={globalStyles.iconButton.color}
                    />
                </TouchableOpacity>

                <LanguageToggle style={globalStyles.iconButton}/>
            </View>

            {/* Заголовок */}
            <Text style={globalStyles.title}>
                {t('setTimeHeader')}
            </Text>

            {/* Выбор времени */}
            {inited ?
                (<TimePicker
                    time={settings.meditationTime}
                    language={settings.language}
                    onChange={updateTime}/>) :
                (<ActivityIndicator size="large"/>)
            }

            {/* Кнопка старт */}
            <NavButton navigate={() => router.push({pathname: '/meditation', params: {h: settings.meditationTime.h, m: settings.meditationTime.m}})}>
                {t('start')}
            </NavButton>

            <NavButton navigate={() => router.push({pathname: '/materials', params: {type: 'sermons'}})}>
                {t('StudyScreen')}
            </NavButton>

            <NavButton navigate={() => router.push({pathname: '/materials', params: {type: 'recitations'}})}>
                {t('Recitations')}
            </NavButton>

            <NavButton navigate={() => router.push('/about-project')}>
                {t('AboutProjectScreen')}
            </NavButton>

            <NavButton navigate={() => router.push('/settings')}>
                {t('SettingsScreen')}
            </NavButton>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    topBar: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        padding: 10,
        zIndex: 1,
    },
    iconButton: {
        marginLeft: 15,
        padding: 10,
    },
    title: {
        fontSize: FONT_SIZE_HEADER,
        textAlign: 'center',
        marginBottom: 20,
    },
});
