import React from 'react';
import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {router} from 'expo-router';
import {Picker} from "@react-native-picker/picker";

import {useSettings} from '../contexts/SettingsContext';
import {FONT_SIZE_DEFAULT} from '../styles/global';
import {useGlobalStyles, useThemePalette} from '../styles/useThemedStyles';
import {ThemePalette} from '../styles/theme';
import {SoundToggle} from "@/components/common/SoundToggle";
import {ThemeToggle} from "@/components/common/ThemeToggle";
import BackNavHeader from "@/components/common/BackNavHeader";
import {LanguageToggle} from "@/components/common/LanguageToggle";
import {
    MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES,
    RECITATION_SOURCE_BHANTE_ASANKHATA,
    RECITATION_SOURCE_BHANTE_GNANASEEHA
} from "@/components/constatnts";
import {RecitationsAudioSource} from "@/components/storage/storage";
import {TitleText} from "@/components/screens/about/TitleText";

export default function SettingsScreen() {
    const { settings, setSettings } = useSettings();
    const { t } = useTranslation();
    const globalStyles = useGlobalStyles();
    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);
    const isIos = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';

    const Row = ({children}: React.PropsWithChildren) => (
        <View style={styles.settingRow}>{children}</View>
    );

    const Label = ({children}: React.PropsWithChildren) => (
        <Text style={styles.label}>{children}</Text>
    );

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
            {isIos && <BackNavHeader onBack={() => router.back()}/>}

            <TitleText textAlign={'center'}>{t('SettingsScreen')}</TitleText>

            <Row>
                <Label>{t('Theme')}</Label>
                <ThemeToggle size={28} style={{marginRight: 4}}/>
            </Row>

            <Row>
                <Label>{t('Language')}</Label>
                <LanguageToggle/>
            </Row>

            <Row>
                <Label>{t('Sound')}</Label>
                <SoundToggle toggleSound={toggleSound} soundEnabled={settings.soundEnabled} />
            </Row>

            <Row>
                <View style={{ flex: 1 }}>
                    <Label>{t('Recitations')}</Label>
                    <Text style={styles.hint}>
                        {t('RecitationsHint', { minutes: MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES })}
                    </Text>
                </View>
                <SoundToggle toggleSound={toggleRecitations} soundEnabled={settings.recitationsSoundEnabled} />
            </Row>

            <Row>
                <View style={{ flex: 1 }}>
                    <Label>{t('RecitationsReadBy')}</Label>
                    <Picker
                        mode='dropdown'
                        dropdownIconColor={palette.icon}
                        selectedValue={settings.recitationsAudioSource}
                        onValueChange={ChangeRecitationsSource}
                        style={isAndroid ? styles.pickerAndroid : undefined}
                        itemStyle={isAndroid ? undefined : styles.pickerItemIos}
                        selectionColor={isAndroid ? palette.pickerSelection : undefined}
                    >
                        <Picker.Item
                            label={t('TeacherName')}
                            value={RECITATION_SOURCE_BHANTE_GNANASEEHA}
                        />
                        <Picker.Item
                            label={t('BhanteAsankhataName')}
                            value={RECITATION_SOURCE_BHANTE_ASANKHATA}
                        />
                    </Picker>
                </View>
            </Row>
        </ScrollView>
    );
}

const makeStyles = (p: ThemePalette) => StyleSheet.create({
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: p.border,
    },
    label: {
        fontSize: FONT_SIZE_DEFAULT,
        fontWeight: '500',
        color: p.text,
    },
    hint: {
        fontSize: FONT_SIZE_DEFAULT,
        color: p.subtleText,
        marginTop: 2,
    },
    pickerAndroid: {
        backgroundColor: p.pickerSurface,
        color: p.pickerText,
    },
    pickerItemIos: {
        color: p.pickerText,
    },
});
