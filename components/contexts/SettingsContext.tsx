import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {NativeModules, Platform} from 'react-native';
import { AppSettings, loadSettings, saveSettings } from '../storage/storage';
import i18n from '../i18n';
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";

type ContextType = {
    settings: AppSettings;
    setSettings: (s: AppSettings) => void;
    toggleLanguage: () => void;
    inited: boolean;
};

const defaultSettings: AppSettings = {
    meditationTime: { h: 0, m: 30 },
    language: 'ru',
    soundEnabled: true,
    recitationsSoundEnabled: true,
    fontSize: FONT_SIZE_DEFAULT,
};

const SettingsContext = createContext<ContextType | undefined>(undefined);

export const SettingsProvider= ({ children } : PropsWithChildren) => {
    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings?.AppleLocale ||
            NativeModules.SettingsManager.settings?.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    const systemLang = ['ru_RU', 'ru'].includes(deviceLanguage) ? 'ru' : 'en';

    const [settings, setSettingsState] = useState<AppSettings>({ ...defaultSettings, language: systemLang});
    const [inited, setInited] = useState(false);

    useEffect(() => {
        (async () => {
            if (inited) return;

            const saved = await loadSettings();
            if (saved) {
                setSettingsState(saved);
                setInited(true);
                if (saved.language !== settings.language || saved.language !== 'ru') {
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
            language: settings.language === 'ru' ? 'en' : 'ru',
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