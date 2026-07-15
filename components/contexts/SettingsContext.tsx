import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {Appearance} from 'react-native';
import { getLocales } from 'expo-localization';
import {AppSettings, loadSettings, saveSettings} from '../storage/storage';
import i18n from '../i18n';
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";
import {Theme} from "@/components/styles/theme";
import {
    RU_LANGUAGE,
    EN_LANGUAGE,
    RECITATION_SOURCE_BHANTE_GNANASEEHA
} from "@/components/constatnts";

const DEFAULT_SETTINGS: AppSettings = {
    meditationTime: { h: 0, m: 30 },
    language: RU_LANGUAGE,
    soundEnabled: true,
    recitationsSoundEnabled: true,
    fontSize: FONT_SIZE_DEFAULT,
    recitationsAudioSource: RECITATION_SOURCE_BHANTE_GNANASEEHA,
}

type ContextType = {
    settings: AppSettings;
    setSettings: (s: AppSettings) => void;
    toggleLanguage: () => void;
    theme: Theme;
    toggleTheme: () => void;
    inited: boolean;
};

const SettingsContext = createContext<ContextType | undefined>(undefined);

export const SettingsProvider= ({ children } : PropsWithChildren) => {
    const locales = getLocales();
    const isRuLangDevice = locales
        .map((locale) => locale.languageCode)
        .includes('ru');

    const systemLang = isRuLangDevice ? RU_LANGUAGE : EN_LANGUAGE;
    const systemTheme: Theme = Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';

    const [settings, setSettingsState] = useState<AppSettings>({ ...DEFAULT_SETTINGS, language: systemLang, theme: systemTheme});
    const [inited, setInited] = useState(false);

    useEffect(() => {
        (async () => {
            if (inited) return;

            const saved = await loadSettings();
            if (saved) {
                // Migration: settings persisted before the dark-theme feature lack `theme`.
                // Initialize from the current system color scheme exactly once, then it persists.
                const migrated: AppSettings = saved.theme === undefined ? { ...saved, theme: systemTheme } : saved;
                setSettingsState(migrated);
                setInited(true);
                //Our default language is ru, so we need to change language anyway if it's not ru
                if (saved.language !== settings.language || saved.language !== RU_LANGUAGE) {
                    await i18n.changeLanguage(saved.language);
                }
            } else {
                // first run
                const initial = { ...settings };
                await i18n.changeLanguage(initial.language);
            }
            setInited(true);
        })();
    }, [settings, inited]);

    useEffect(() => {
        if (inited) void saveSettings(settings);
    }, [settings, inited]);

    const setSettings = (s: AppSettings) => {
        if (settings.language !== s.language) {
            void i18n.changeLanguage(s.language);
        }

        setSettingsState(s);
    }

    const toggleLanguage = () =>
        setSettings({
            ...settings,
            language: settings.language === RU_LANGUAGE ? EN_LANGUAGE : RU_LANGUAGE,
        });

    const toggleTheme = () =>
        setSettings({
            ...settings,
            theme: (settings.theme ?? systemTheme) === 'dark' ? 'light' : 'dark',
        });

    const theme: Theme = settings.theme ?? 'light';

    return (
        <SettingsContext.Provider value={{settings, setSettings, toggleLanguage, theme, toggleTheme, inited}}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
    return ctx;
};