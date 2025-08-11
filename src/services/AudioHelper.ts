import {AudioPlayer} from "expo-audio/src/AudioModule.types";

//TODO: do we need it?
//Get audio duration in seconds
export const getAudioDurationsInSeconds = (players: AudioPlayer[]) =>
    players.map((player) => player.duration)
        .reduce((previousValue, currentValue) =>
        previousValue + currentValue);

export const playSound = (player: AudioPlayer) =>
    player.seekTo(0).then(() => player.play());