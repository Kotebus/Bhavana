import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import { getLocales } from 'expo-localization';
import {AppSettings, loadSettings, saveSettings} from '../storage/storage';
import i18n from '../i18n';
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";
import {
    RU_LANGUAGE,
    EN_LANGUAGE,
    RECITATION_SOURCE_BHANTE_GNANASEEHA
} from "@/components/constatnts";

type ContextType = {
    settings: AppSettings;
    setSettings: (s: AppSettings) => void;
    toggleLanguage: () => void;
    inited: boolean;
};

const defaultSettings: AppSettings = {
    meditationTime: { h: 0, m: 30 },
    language: RU_LANGUAGE,
    soundEnabled: true,
    recitationsSoundEnabled: true,
    fontSize: FONT_SIZE_DEFAULT,
    recitationsAudioSource: RECITATION_SOURCE_BHANTE_GNANASEEHA,
}

const SettingsContext = createContext<ContextType | undefined>(undefined);

export const SettingsProvider= ({ children } : PropsWithChildren) => {
    const locales = getLocales();
    const isRuLangDevice = locales
        .map((locale) => locale.languageCode)
        .includes('ru');

    const systemLang = isRuLangDevice ? RU_LANGUAGE : EN_LANGUAGE;

    const [settings, setSettingsState] = useState<AppSettings>({ ...defaultSettings, language: systemLang});
    const [inited, setInited] = useState(false);

    useEffect(() => {
        (async () => {
            if (inited) return;

            const saved = await loadSettings();
            if (saved) {
                setSettingsState(saved);
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

    return (
        <SettingsContext.Provider value={{settings, setSettings, toggleLanguage, inited}}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
    return ctx;
};