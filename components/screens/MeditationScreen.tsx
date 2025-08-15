import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useTranslation} from "react-i18next";

import {useSettings} from "../contexts/SettingsContext";
import {FONT_SIZE_HEADER} from "../styles/global";
import {RootStackParamList} from "@/components/common/AppNavigator";
import {playSound} from "@/components/services/AudioHelper";
import {useAudio} from "@/components/contexts/AudioContext";
import {LotusAnimated} from "@/components/common/LotusAnimated";
import {NavButton} from "@/components/common/NavButton";
import {useKeepAwake} from "expo-keep-awake";

const DELAY_BEFORE_START_SESSION_SECONDS = 2;
export const MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES = 10;

type Props = NativeStackScreenProps<RootStackParamList, 'MeditationScreen'>;

const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

//TODO: add documentation everywhere!
//TODO: create readme
export default function MeditationScreen({ route, navigation }: Props) {
    //Prevent from sleep mode
    useKeepAwake();
    const { h, m } = route.params;
    const { settings } = useSettings();
    const { t } = useTranslation();

    //Когда начинается сессия медитации мы проигрываем славословия перед медитацией (recitationsBeforeSession),
    //потом идёт медитация, потом в конце медитации идут завершающие славословия подношения практики (recitationsEndSession).
    //В аудиофайлах славословий уже есть звук гонга.
    //Если сессия короче 10 минут, то мы не проигрываем славословия, только гонг из отдельного аудиофайла, т.к. это слишком короткая сессия.
    //Также мы из не проигрываем если пользователь отключил их в настройках (settings.recitationsSoundEnabled).
    //Если пользователь отключил звук в настройках, то никакие звуки не проигрываются.
    // !settings.soundEnabled = no sounds
    // !shouldPlayRecitations = gong -> session time -> gong
    // shouldPlayRecitations = recitationsBeforeSession -> session time -> recitationsEndSession
    const {playerGong, recitationsBeforeSession, recitationsEndSession, stopAllPlayers} = useAudio();

    const [elapsed, setElapsed] = useState(0);

    const totalMeditationDurationSeconds = (h ?? 0) * 3600 + (m ?? 0) * 60;

    const shouldPlayRecitation =
        settings.soundEnabled &&
        settings.recitationsSoundEnabled &&
        totalMeditationDurationSeconds > (MIN_SESSION_DURATION_FROM_RECITATIONS_MINUTES * 60);

    //Sounds at the beginning of the session. We need an effect here to be able to stop sounds when user leave the screen.
    useEffect(() => {
        if (settings.soundEnabled) {
            const playSounds = shouldPlayRecitation ?
                () => playSound(recitationsBeforeSession) :
                () => playSound(playerGong);

            void playSounds();
        }

        return () => stopAllPlayers();
    }, [totalMeditationDurationSeconds, playerGong, recitationsBeforeSession, settings.soundEnabled, shouldPlayRecitation, stopAllPlayers]);

    //Timer and sounds at the end of the session
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
    }, [settings.soundEnabled, recitationsEndSession, playerGong, stopAllPlayers, totalMeditationDurationSeconds, shouldPlayRecitation]);

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

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: '20%', top: '5%' },
    content: {
        alignItems: 'center',
    },
    image: { width: '60%', height: '35%', top: '20%', position: 'absolute' },
    timer: { fontSize: 40, fontWeight: 'bold', alignSelf: 'center'},
    goal: { fontSize: FONT_SIZE_HEADER, color: '#666', marginTop: 8, alignSelf: 'center', marginBottom: '-20%' },
    button: { bottom: '15%', position: 'absolute' },
});

