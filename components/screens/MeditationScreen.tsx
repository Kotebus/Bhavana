import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useTranslation} from "react-i18next";

import {useSettings} from "../contexts/SettingsContext";
import {globalStyles} from "../styles/global";
import {RootStackParamList} from "@/components/AppNavigator";
import {playSound} from "@/components/services/AudioHelper";
import {useAudio} from "@/components/contexts/AudioContext";


type Props = NativeStackScreenProps<RootStackParamList, 'MeditationScreen'>;

const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export default function MeditationScreen({ route, navigation }: Props) {
    const { h, m } = route.params;
    const { settings } = useSettings();
    const { t } = useTranslation();
    const {playerStart, playerEnd, stopAllPlayers} = useAudio();

    const [elapsed, setElapsed] = useState(0);

    const totalMeditationDurationSeconds =(h ?? 0) * 3600 + (m ?? 0) * 60;
    const isShortSession = playerStart.duration + playerEnd.duration > (totalMeditationDurationSeconds)

    //If session is too short we wouldn't play sounds
    const shouldPlaySound = settings.soundEnabled && !isShortSession;
    //At that moment we should start playing end sound to finish it before session's end.
    const secondsToStartEndSound = Math.ceil(totalMeditationDurationSeconds - (playerEnd.duration + 5));

    useEffect(() => {
        if (shouldPlaySound) {
            void playSound(playerStart);
        }

        const interval = setInterval(() => {
            setElapsed((prev) => {
                const nextSecond = prev + 1;
                if (shouldPlaySound && nextSecond === secondsToStartEndSound) {
                    void playSound(playerEnd);
                }
                if (nextSecond >= totalMeditationDurationSeconds) {
                    clearInterval(interval);
                    return totalMeditationDurationSeconds;
                }
                return nextSecond;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
            stopAllPlayers();
        }
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/images/lotus.png')}
                resizeMode='contain'
                style={styles.image}/>
            <Text style={styles.timer}>{formatTime(elapsed)}</Text>
            <Text style={styles.goal}>{formatTime(totalMeditationDurationSeconds)}</Text>
            <TouchableOpacity
                style={[globalStyles.button, styles.button]}
                onPress={() => navigation.goBack()}
            >
                <Text style={globalStyles.buttonText}>
                    {t('endSession')}
                </Text>
            </TouchableOpacity>
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
    goal: { fontSize: 20, color: '#666', marginTop: 8, alignSelf: 'center', marginBottom: '-20%' },
    button: { bottom: '15%', position: 'absolute' },
});

