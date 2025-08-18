import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Picker} from "@react-native-picker/picker";

import {useSettings} from '../contexts/SettingsContext';
import {FONT_SIZE_DEFAULT, globalStyles} from '../styles/global';
import {RootStackParamList} from '@/components/common/AppNavigator';
import {SoundToggle} from "@/components/common/SoundToggle";
import BackNavHeader from "@/components/common/BackNavHeader";
import {LanguageToggle} from "@/components/common/LanguageToggle";
import {
    MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES,
    RECITATION_SOURCE_BHANTE_ASANKHATA,
    RECITATION_SOURCE_BHANTE_GNANASEEHA
} from "@/components/constatnts";
import {RecitationsAudioSource} from "@/components/storage/storage";

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

    const ChangeRecitationsSource = (val: RecitationsAudioSource) =>
        setSettings({
            ...settings,
            recitationsAudioSource: val,
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

            <View style={styles.settingRow}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.label}>{t('RecitationsReadBy')}</Text>
                    <Picker
                        mode='dropdown'
                        dropdownIconColor={'black'}
                        selectedValue={settings.recitationsAudioSource}
                        onValueChange={ChangeRecitationsSource}
                    >
                        <Picker.Item
                            key={RECITATION_SOURCE_BHANTE_GNANASEEHA}
                            label={t('TeacherName')}
                            value={RECITATION_SOURCE_BHANTE_GNANASEEHA}
                        />
                        <Picker.Item
                            key={RECITATION_SOURCE_BHANTE_ASANKHATA}
                            label={t('BhanteAsankhataName')}
                            value={RECITATION_SOURCE_BHANTE_ASANKHATA}
                        />
                    </Picker>
                </View>
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
