import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Ionicons from '@react-native-vector-icons/ionicons';

import {FONT_SIZE_HEADER} from "../styles/global";
import {useGlobalStyles} from "../styles/useThemedStyles";
import {RootStackParamList} from "@/components/common/AppNavigator";
import TimePicker from "@/components/common/TimePicker";
import {ITime} from "@/components/storage/storage";
import {useSettings} from "@/components/contexts/SettingsContext";
import {LanguageToggle} from "@/components/common/LanguageToggle";
import {NavButton} from "@/components/common/NavButton";
import {ThemeToggle} from "@/components/common/ThemeToggle";
import {recitationsRoutingList, sermonsRoutingList} from "@/components/screens/materials/SermonsRoutingList";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
    const {settings, setSettings, inited} = useSettings();
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();

    const updateTime = (newTime: ITime) =>
        setSettings({...settings, meditationTime: newTime});

    const toggleSound = () =>
        setSettings({...settings, soundEnabled: !settings.soundEnabled});

    const languageNavigationParams = {language: settings.language};

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
            <NavButton navigate={() => navigation.navigate('MeditationScreen', settings.meditationTime)}>
                {t('start')}
            </NavButton>

            <NavButton navigate={() => navigation.navigate('MaterialsListScreen', {
                materialsList: sermonsRoutingList,
                ...languageNavigationParams
            })}>
                {t('StudyScreen')}
            </NavButton>

            <NavButton navigate={
                () => navigation.navigate('MaterialsListScreen', {
                    materialsList: recitationsRoutingList,
                    ...languageNavigationParams
                })
            }>
                {t('Recitations')}
            </NavButton>

            <NavButton navigate={() => navigation.navigate('AboutProjectScreen', languageNavigationParams)}>
                {t('AboutProjectScreen')}
            </NavButton>

            <NavButton navigate={() => navigation.navigate('SettingsScreen', languageNavigationParams)}>
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