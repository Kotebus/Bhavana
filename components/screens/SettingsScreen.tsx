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
import {TitleText} from "@/components/screens/about/TitleText";

type Props = NativeStackScreenProps<RootStackParamList, 'SettingsScreen'>;

const Row = ({children}: React.PropsWithChildren) => {
    return (
        <View style={styles.settingRow}>
            {children}
        </View>
    );
}

const Label =  ({children}: React.PropsWithChildren) => {
    return (
        <Text style={styles.label}>
            {children}
        </Text>
    );
}

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

    const isAndroid = Platform.OS === 'android';

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {isIos && <BackNavHeader onBack={() => navigation.goBack()}/>}

            <TitleText textAlign={'center'}>{t('SettingsScreen')}</TitleText>

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
                        dropdownIconColor={'black'}
                        selectedValue={settings.recitationsAudioSource}
                        onValueChange={ChangeRecitationsSource}
                        style={isAndroid ? styles.pickerAndroid : undefined}
                        selectionColor={isAndroid ? 'lightgrey' : undefined}
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
    pickerAndroid: {
        backgroundColor: 'white',
        color: 'black',
    }
});
