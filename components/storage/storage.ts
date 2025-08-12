import AsyncStorage from '@react-native-async-storage/async-storage';

export type Language = 'ru' | 'en';

export interface ITime {
    h: number;
    m: number;
}
export type AppSettings = {
    meditationTime: ITime;
    language: Language;
    soundEnabled: boolean;
    fontSize: number;
};

const SETTINGS_KEY = 'app_settings_v1';

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