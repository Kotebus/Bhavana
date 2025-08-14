import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

import {FONT_SIZE_HEADER, globalStyles} from "../styles/global";
import {RootStackParamList} from "@/components/AppNavigator";
import TimePicker from "@/components/TimePicker";
import {ITime} from "@/components/storage/storage";
import {useSettings} from "@/components/contexts/SettingsContext";
import {LanguageToggle} from "@/components/LanguageToggle";

type Props = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen({ navigation }: Props) {
    const {settings, setSettings, inited} = useSettings();
    const {t} = useTranslation();


    const updateTime = (newTime: ITime) =>
        setSettings({...settings, meditationTime: newTime});

    const toggleSound = () =>
        setSettings({...settings, soundEnabled: !settings.soundEnabled});

    const languageNavigationParams = {language: settings.language};

    return (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
            {/* Верхняя панель с иконками */}
            <View style={styles.topBar}>
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
                onPress={() => navigation.navigate('SermonScreen', {
                    sermonKey: 'Recitations',
                    language: settings.language
                })}
            >
                <Text style={globalStyles.buttonText}>
                    {t('Recitations')}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={globalStyles.button}
                onPress={() => navigation.navigate('SettingsScreen', languageNavigationParams)}
            >
                <Text style={globalStyles.buttonText}>
                    {t('SettingsScreen')}
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingTop: 20,
        padding: 10
    },
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