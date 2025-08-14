import React, {createContext, useContext, PropsWithChildren} from 'react';
import {useAudioPlayer} from "expo-audio";
import {AudioPlayer} from "expo-audio/src/AudioModule.types";

const START_SRC = '../../assets/sounds/recitationsBeforeSession.mp3';
const END_SRC = '../../assets/sounds/recitationsAfterSession.mp3';
const GONG_SRC = '../../assets/sounds/gong.mp3';

interface AudioContextProps {
    playerGong: AudioPlayer;
    recitationsBeforeSession: AudioPlayer;
    recitationsEndSession: AudioPlayer;
    stopAllPlayers: () => void;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

const stopPlayerIfLoaded = (player: AudioPlayer) => {
    if (player.isLoaded) {
        player.pause();
        void player.seekTo(0);
    }
}

//TODO: check lint warning about require: https://typescript-eslint.io/rules/no-require-imports/

export const AudioProvider = ({ children } : PropsWithChildren) => {
    const recitationsBeforeSession = useAudioPlayer(require(START_SRC));
    const recitationsEndSession = useAudioPlayer(require(END_SRC));
    const playerGong = useAudioPlayer(require(GONG_SRC));

    //TODO: do we need it? Maybe try catch and error state to monitor?
    const stopAllPlayers = () => {
        stopPlayerIfLoaded(recitationsBeforeSession);
        stopPlayerIfLoaded(recitationsEndSession);
        stopPlayerIfLoaded(playerGong);
    }

    return (
        <AudioContext.Provider value={{recitationsBeforeSession, recitationsEndSession, playerGong, stopAllPlayers}}>
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