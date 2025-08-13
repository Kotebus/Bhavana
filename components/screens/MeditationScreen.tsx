import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {useTranslation} from "react-i18next";

import {useSettings} from "../contexts/SettingsContext";
import {FONT_SIZE_HEADER, globalStyles} from "../styles/global";
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
    const {playerGong, playerEnd, stopAllPlayers} = useAudio();

    const [elapsed, setElapsed] = useState(0);

    const totalMeditationDurationSeconds =(h ?? 0) * 3600 + (m ?? 0) * 60;
    const isShortSession =  totalMeditationDurationSeconds < 10 * 60;

    //If session is too short we wouldn't play sounds
    const shouldPlaySalutations = settings.soundEnabled && !isShortSession;

    useEffect(() => {
        if (settings.soundEnabled) {
            void playSound(playerGong);
        }

        const interval = setInterval(() => {
            setElapsed((prev) => {
                const nextSecond = prev + 1;

                if (nextSecond >= totalMeditationDurationSeconds) {
                    if (settings.soundEnabled) {
                        playSound(playerGong).then(() => {
                            if (shouldPlaySalutations) {
                                playSound(playerEnd);
                            }
                        });
                    }
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
    goal: { fontSize: FONT_SIZE_HEADER, color: '#666', marginTop: 8, alignSelf: 'center', marginBottom: '-20%' },
    button: { bottom: '15%', position: 'absolute' },
});

