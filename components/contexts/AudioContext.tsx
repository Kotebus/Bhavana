import React, {createContext, useContext, PropsWithChildren} from 'react';
import {useAudioPlayer} from "expo-audio";
import {AudioPlayer} from "expo-audio/src/AudioModule.types";

const START_SRC = '../../assets/sounds/start.mp3';
const END_SRC = '../../assets/sounds/end.mp3';

interface AudioContextProps {
    playerStart: AudioPlayer;
    playerEnd: AudioPlayer;
    stopAllPlayers: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider = ({ children } : PropsWithChildren) => {
    const playerStart = useAudioPlayer(require(START_SRC));
    const playerEnd = useAudioPlayer(require(END_SRC));
    const stopAllPlayers = () => {
        playerStart.pause();
        playerEnd.pause();
    }

    return (
        <AudioContext.Provider value={{playerStart, playerEnd, stopAllPlayers}}>
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