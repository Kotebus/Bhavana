import React, {createContext, useContext, PropsWithChildren} from 'react';
import {useAudioPlayer} from "expo-audio";
import {AudioPlayer} from "expo-audio/src/AudioModule.types";

const recitationsBeforeSessionSource = require('../../assets/sounds/recitationsBeforeSession.mp3');
const recitationsAfterSessionSource = require('../../assets/sounds/recitationsAfterSession.mp3');
const gongSource = require('../../assets/sounds/gong.mp3');

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

export const AudioProvider = ({ children } : PropsWithChildren) => {
    const recitationsBeforeSession = useAudioPlayer(recitationsBeforeSessionSource);
    const recitationsEndSession = useAudioPlayer(recitationsAfterSessionSource);
    const playerGong = useAudioPlayer(gongSource);

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