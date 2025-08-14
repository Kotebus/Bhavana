import React from 'react';
import {View, Text, StyleSheet, ScrollView, Platform} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import { useSettings } from '../contexts/SettingsContext';
import {FONT_SIZE_DEFAULT, globalStyles} from '../styles/global';
import { RootStackParamList } from '@/components/AppNavigator';
import {SoundToggle} from "@/components/SoundToggle";
import {MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES} from "@/components/screens/MeditationScreen";
import BackNavHeader from "@/components/BackNavHeader";
import {LanguageToggle} from "@/components/LanguageToggle";

type Props = NativeStackScreenProps<RootStackParamList, 'SettingsScreen'>;

export default function SettingsScreen({ navigation }: Props) {
    const { settings, setSettings } = useSettings();
    const { t } = useTranslation();
    const isIos = Platform.OS === 'ios';

    const toggleSound = () =>
        setSettings({
            ...settings,
            soundEnabled: !settings.soundEnabled,
        });

    const toggleRecitations = () =>
        setSettings({
            ...settings,
            recitationsSoundEnabled: !settings.recitationsSoundEnabled,
        });

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {isIos && <BackNavHeader onBack={() => navigation.goBack()}/>}

            <Text style={globalStyles.title}>{t('Settings')}</Text>

            {/* Язык */}
            <View style={styles.settingRow}>
                <Text style={styles.label}>{t('Language')}</Text>
                <LanguageToggle/>
            </View>

            {/* Звук */}
            <View style={styles.settingRow}>
                <Text style={styles.label}>{t('Sound')}</Text>
                <SoundToggle toggleSound={toggleSound} soundEnabled={settings.soundEnabled} />
            </View>

            {/* Славословия */}
            <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{t('Recitations')}</Text>
                    <Text style={styles.hint}>
                        {t('RecitationsHint', { minutes: MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES })}
                    </Text>
                </View>
                <SoundToggle toggleSound={toggleRecitations} soundEnabled={settings.recitationsSoundEnabled} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    label: {
        fontSize: FONT_SIZE_DEFAULT,
        fontWeight: '500',
    },
    hint: {
        fontSize: FONT_SIZE_DEFAULT,
        color: '#777',
        marginTop: 2,
    },
});
