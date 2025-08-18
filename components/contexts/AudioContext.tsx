import React, {createContext, useContext, PropsWithChildren} from 'react';
import {useAudioPlayer} from "expo-audio";
import {AudioPlayer} from "expo-audio/src/AudioModule.types";

//Recitations by bhante Asankhata
const recitationsBeforeSessionSourceByBhanteAsankhata = require('../../assets/sounds/asankhata/recitationsBeforeSession.mp3');
const recitationsAfterSessionSourceByBhanteAsankhata = require('../../assets/sounds/asankhata/recitationsAfterSession.mp3');

//Recitations by bhante Gnanaseeha
const recitationsBeforeSessionSourceByBhanteGnanaseeha = require('../../assets/sounds/gnanaseeha/recitationsBeforeSession.mp3');
const recitationsAfterSessionSourceByBhanteGnanaseeha = require('../../assets/sounds/gnanaseeha/recitationsAfterSession.mp3');

const gongSource = require('../../assets/sounds/gong.mp3');

interface IRecitationsAudio {
    recitationsBeforeSession: AudioPlayer;
    recitationsEndSession: AudioPlayer;
}
interface AudioContextProps {
    playerGong: AudioPlayer;
    recitationsByBhatneAsankhata: IRecitationsAudio;
    recitationsByBhatneGnanaseeha: IRecitationsAudio;
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
    const recitationsBeforeSessionByBhatneAsankhata = useAudioPlayer(recitationsBeforeSessionSourceByBhanteAsankhata);
    const recitationsEndSessionByBhatneAsankhata = useAudioPlayer(recitationsAfterSessionSourceByBhanteAsankhata);
    const recitationsBeforeSessionByBhatneGnanaseeha = useAudioPlayer(recitationsBeforeSessionSourceByBhanteGnanaseeha);
    const recitationsEndSessionByBhatneGnanaseeha = useAudioPlayer(recitationsAfterSessionSourceByBhanteGnanaseeha);
    const playerGong = useAudioPlayer(gongSource);

    const stopAllPlayers = () => {
        stopPlayerIfLoaded(recitationsBeforeSessionByBhatneAsankhata);
        stopPlayerIfLoaded(recitationsEndSessionByBhatneAsankhata);
        stopPlayerIfLoaded(recitationsBeforeSessionByBhatneGnanaseeha);
        stopPlayerIfLoaded(recitationsEndSessionByBhatneGnanaseeha);
        stopPlayerIfLoaded(playerGong);
    }

    const value: AudioContextProps = {
        recitationsByBhatneAsankhata : {
            recitationsBeforeSession: recitationsBeforeSessionByBhatneAsankhata,
            recitationsEndSession: recitationsEndSessionByBhatneAsankhata,
        },
        recitationsByBhatneGnanaseeha : {
            recitationsBeforeSession: recitationsBeforeSessionByBhatneGnanaseeha,
            recitationsEndSession: recitationsEndSessionByBhatneGnanaseeha,
        },
        playerGong,
        stopAllPlayers,
    }

    return (
        <AudioContext.Provider value={value}>
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