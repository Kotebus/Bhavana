import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import  TimePicker from '../components/TimePicker';
import {useSettings} from "../contexts/SettingsContext";
import {globalStyles} from "../styles/global";
import {RootStackParamList} from "../components/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
    const { settings, setSettings } = useSettings();
    const { t } = useTranslation();
    const [time, setTime] = useState(settings.meditationTime);

    const toggleSound = () => {
        setSettings({ ...settings, soundEnabled: !settings.soundEnabled });
    };

    const toggleLanguage = () => {
        setSettings({ ...settings, language: settings.language === 'ru' ? 'en' : 'ru' });
    };

    const languageNavigationParams = {language: settings.language};

    return (
        <View style={globalStyles.container}>
            {/* Верхняя панель с иконками */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={toggleSound} style={globalStyles.iconButton}>
                    <Ionicons
                        name={settings.soundEnabled ? 'volume-high' : 'volume-mute'}
                        size={28}
                        color={globalStyles.iconButton.color}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleLanguage} style={globalStyles.iconButton}>
                    <Text style={{ fontSize: 24 }}>
                        {settings.language === 'ru' ? '🇷🇺' : '🇺🇸'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Заголовок */}
            <Text style={globalStyles.title}>
                {t('setTimeHeader')}
            </Text>

            {/* Выбор времени */}
            <TimePicker
                time={time}
                language={settings.language}
                onChange={setTime} />

            {/* Кнопка старт */}
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => {
                    setSettings({ ...settings, meditationTime: time });
                    navigation.navigate('MeditationScreen', time);
                }}
            >
                <Text style={globalStyles.buttonText}>
                    {t('start')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('StudyScreen', languageNavigationParams)}
            >
                <Text style={globalStyles.buttonText}>
                    {t('StudyScreen')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('AboutScreen', languageNavigationParams)}
            >
                <Text style={globalStyles.buttonText}>
                    {t('AboutScreen')}
                </Text>
            </TouchableOpacity>
        </View>
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
        top: 40,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 15,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
});