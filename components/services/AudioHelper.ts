import {AudioPlayer} from "expo-audio/src/AudioModule.types";

export const playSound = (player: AudioPlayer) =>
    player.seekTo(0).then(() => player.play());