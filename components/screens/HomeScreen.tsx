import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import {useSettings} from "../contexts/SettingsContext";
import {globalStyles} from "../styles/global";
import {RootStackParamList} from "@/components/AppNavigator";
import TimePicker from "@/components/TimePicker";
import {ITime} from "@/components/storage/storage";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
    const { settings, setSettings } = useSettings();
    const { t } = useTranslation();
    // const [time, setTime] = useState(settings.meditationTime);
    //
    // useEffect(() => {
    //     setTime(settings.meditationTime);
    // }, [settings, time]);

    const updateTime = (newTime: ITime) => {
        setSettings({...settings, meditationTime: newTime});
        // setTime(newTime);
    }

    const toggleSound = () => {
        setSettings({ ...settings, soundEnabled: !settings.soundEnabled });
    };

    const toggleLanguage = () => {
        setSettings({ ...settings, language: settings.language === 'ru' ? 'en' : 'ru' });
    };

    const languageNavigationParams = {language: settings.language};

    return (
        <ScrollView
            //style={globalStyles.container}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingTop: 20, padding: 10 }}
        >
            {/*<View style={globalStyles.container}>*/}
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
                    time={settings.meditationTime}
                    language={settings.language}
                    onChange={updateTime} />

                {/* Кнопка старт */}
                <TouchableOpacity
                    style={globalStyles.button}
                    onPress={() => navigation.navigate('MeditationScreen', settings.meditationTime)}
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
                    onPress={() => navigation.navigate('SermonScreen', {sermonKey: 'Recitations', language: settings.language})}
                >
                    <Text style={globalStyles.buttonText}>
                        {t('Recitations')}
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
            {/*</View>*/}
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
    },
    iconButton: {
        marginLeft: 15,
        padding: 10,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
});