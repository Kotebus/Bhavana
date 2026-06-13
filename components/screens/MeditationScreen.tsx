import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from "react-i18next";
import {useThemePalette} from '@/components/styles/useThemedStyles';
import {ThemePalette} from '@/components/styles/theme';

import {useSettings} from "../contexts/SettingsContext";
import {FONT_SIZE_HEADER} from "../styles/global";
import {RootStackParamList} from "@/components/common/AppNavigator";
import {playSound} from "@/components/services/AudioHelper";
import {useAudio} from "@/components/contexts/AudioContext";
import {LotusAnimated} from "@/components/common/LotusAnimated";
import {NavButton} from "@/components/common/NavButton";
import {activateKeepAwakeAsync, deactivateKeepAwake} from "expo-keep-awake";
import {
    DELAY_BEFORE_START_SESSION_SECONDS,
    MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES,
    RECITATION_SOURCE_BHANTE_GNANASEEHA
} from "@/components/constatnts";
import {formatTime} from "@/components/services/TimeHelper";

type Props = NativeStackScreenProps<RootStackParamList, 'MeditationScreen'>;


export default function MeditationScreen({ route, navigation }: Props) {
    //Prevent this screen from sleep mode
    void activateKeepAwakeAsync();

    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);

    const { h, m } = route.params;
    const { settings } = useSettings();
    const { t } = useTranslation();

    /*
    When a meditation session begins, we play the pre-meditation recitations (recitationsBeforeSession).
    Then comes the meditation itself.
    At the end of the meditation, we play the dedication recitations (recitationsEndSession).

    Note: The recitation audio files already include the gong sound.

    There are two available recitation voice-overs: Bhante Gnanaseeha and Bhante Asankhata.
    The version to use is defined in the settings: settings.recitationsAudioSource

    Special cases

    If the session duration is less than 10 minutes, recitations are skipped. Instead, only the gong from a separate
    audio file is played (playerGong), since the session is considered too short for recitations.

    If the user has disabled recitations in the settings (settings.recitationsSoundEnabled = false), they are not played.
    If the user has disabled all sounds (settings.soundEnabled = false), then no sounds at all are played.

    Logic summary

    !settings.soundEnabled → no sounds at all
    !shouldPlayRecitations → gong → session time → gong
    shouldPlayRecitations → recitationsBeforeSession → session time → recitationsEndSession
    */

    const {playerGong, recitationsByBhatneAsankhata, recitationsByBhatneGnanaseeha, stopAllPlayers} = useAudio();

    const { recitationsBeforeSession, recitationsEndSession} =
        settings.recitationsAudioSource === RECITATION_SOURCE_BHANTE_GNANASEEHA ?
            recitationsByBhatneGnanaseeha : recitationsByBhatneAsankhata;

    const [elapsed, setElapsed] = useState(0);

    const totalMeditationDurationSeconds = (h ?? 0) * 3600 + (m ?? 0) * 60;

    const shouldPlayRecitation =
        settings.soundEnabled &&
        settings.recitationsSoundEnabled &&
        totalMeditationDurationSeconds >= (MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES * 60);

    //We don't need to keep app awake besides meditation screen
    useEffect(() => {
        return () => void deactivateKeepAwake();
    }, []);

    //Sounds at the beginning of the session. We need an effect here to be able to stop sounds when user leave the screen.
    useEffect(() => {
        if (settings.soundEnabled) {
            const startSound =
                shouldPlayRecitation ? recitationsBeforeSession : playerGong;

            void playSound(startSound);
        }

        return () => stopAllPlayers();
    }, [
        totalMeditationDurationSeconds,
        playerGong,
        recitationsBeforeSession,
        settings.soundEnabled,
        shouldPlayRecitation,
        stopAllPlayers
    ]);

    //Timer processing and sounds at the end of the session
    useEffect(() => {
        const endSound = shouldPlayRecitation ?
            recitationsEndSession :
            playerGong;

        const intervalFunction = () => {
            return setInterval(() => {
                setElapsed((prev) => {
                    const nextSecond = prev + 1;

                    if (settings.soundEnabled &&
                        nextSecond === totalMeditationDurationSeconds - Math.round(endSound.duration)) {
                        void playSound(endSound);
                    }

                    if (nextSecond >= totalMeditationDurationSeconds) {
                        clearInterval(interval);
                        return totalMeditationDurationSeconds;
                    }
                    return nextSecond;
                });
            }, 1000);
        };

        //We want to delay start of the timer for DELAY_BEFORE_START_SESSION_SECONDS, to give person some time to settle down
        const interval = setTimeout(intervalFunction, DELAY_BEFORE_START_SESSION_SECONDS * 1000)

        return () => {
            stopAllPlayers();
            clearInterval(interval);
        }
    }, [
        settings.soundEnabled,
        recitationsEndSession,
        playerGong, stopAllPlayers,
        totalMeditationDurationSeconds,
        shouldPlayRecitation
    ]);

    return (
        <View style={styles.container}>
            <LotusAnimated
                imageStyle={styles.image}
                animationDuration={DELAY_BEFORE_START_SESSION_SECONDS * 1000}
            />
            <Text style={styles.timer}>{formatTime(elapsed)}</Text>
            <Text style={styles.goal}>{formatTime(totalMeditationDurationSeconds)}</Text>
            <NavButton navigate={() => navigation.goBack()} additionalButtonStyle={styles.button}>
                {t('endSession')}
            </NavButton>
        </View>
    );
}

const makeStyles = (p: ThemePalette) => StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: '20%', top: '5%' },
    content: {
        alignItems: 'center',
    },
    image: { width: '60%', height: '35%', top: '20%', position: 'absolute' },
    timer: { fontSize: 40, fontWeight: 'bold', alignSelf: 'center',  fontVariant: ['tabular-nums'], color: p.text},
    goal: { fontSize: FONT_SIZE_HEADER, color: p.subtleText, marginTop: 8, alignSelf: 'center', marginBottom: '-20%' },
    button: { bottom: '15%', position: 'absolute' },
});

