import React, {createContext, useContext, PropsWithChildren} from 'react';
import {useAudioPlayer} from "expo-audio";
import {AudioPlayer} from "expo-audio/src/AudioModule.types";

const START_SRC = '../../assets/sounds/start.mp3';
const GONG_SRC = '../../assets/sounds/gong.mp3';

interface AudioContextProps {
    playerGong: AudioPlayer;
    playerEnd: AudioPlayer;
    stopAllPlayers: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider = ({ children } : PropsWithChildren) => {
    const playerEnd = useAudioPlayer(require(START_SRC));
    const playerGong = useAudioPlayer(require(GONG_SRC));
    const stopAllPlayers = () => {
        playerEnd.pause();
        playerGong.pause();
    }

    return (
        <AudioContext.Provider value={{playerEnd, playerGong, stopAllPlayers}}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudio must be used within a AudioProvider');
    }
    return context;
};