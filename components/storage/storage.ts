import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    EN_LANGUAGE,
    RECITATION_SOURCE_BHANTE_ASANKHATA,
    RECITATION_SOURCE_BHANTE_GNANASEEHA,
    RU_LANGUAGE
} from "@/components/constatnts";
import {Theme} from "@/components/styles/theme";

const SETTINGS_KEY = 'bhavana_app_settings_v4';

export type Language = typeof RU_LANGUAGE | typeof EN_LANGUAGE;

export interface ITime {
    h: number;
    m: number;
}

export type RecitationsAudioSource = typeof RECITATION_SOURCE_BHANTE_GNANASEEHA | typeof RECITATION_SOURCE_BHANTE_ASANKHATA;

export type AppSettings = {
    meditationTime: ITime;
    language: Language;
    soundEnabled: boolean;
    recitationsSoundEnabled: boolean
    fontSize: number;
    recitationsAudioSource: RecitationsAudioSource;
    theme?: Theme;
};

export async function saveSettings(settings: AppSettings) {
    try {
        await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
        console.warn('saveSettings error', e);
    }
}

export async function loadSettings(): Promise<AppSettings | null> {
    try {
        const raw = await AsyncStorage.getItem(SETTINGS_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.warn('loadSettings error', e);
        return null;
    }
}