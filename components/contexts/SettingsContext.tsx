import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from 'react';
import {NativeModules, Platform} from 'react-native';
import { AppSettings, loadSettings, saveSettings } from '../storage/storage';
import i18n from '../i18n';

type ContextType = {
    settings: AppSettings;
    setSettings: (s: AppSettings) => void;
};

const defaultSettings: AppSettings = {
    meditationTime: { h: 0, m: 30 },
    language: 'ru',
    soundEnabled: true,
    fontSize: 16,
};

const SettingsContext = createContext<ContextType | undefined>(undefined);

export const SettingsProvider= ({ children } : PropsWithChildren) => {
    const deviceLanguage =
        Platform.OS === 'ios'
            ? NativeModules.SettingsManager.settings?.AppleLocale ||
            NativeModules.SettingsManager.settings?.AppleLanguages[0] //iOS 13
            : NativeModules.I18nManager.localeIdentifier;

    const systemLang = deviceLanguage === 'ru_RU' || 'ru' ? 'ru' : 'en';

    const [settings, setSettingsState] = useState<AppSettings>({ ...defaultSettings, language: systemLang});
    const [inited, setInited] = useState(false);

    useEffect(() => {
        (async () => {
            if (inited) return;

            const saved = await loadSettings();
            if (saved) {
                setSettingsState(saved);
                if (saved.language !== settings.language) {
                    await i18n.changeLanguage(saved.language);
                }
            } else {
                // first run: save defaults
                const initial = { ...settings };
                setSettingsState(initial);

                await Promise.all([
                    i18n.changeLanguage(initial.language),
                    saveSettings(initial)
                ]);
            }
            setInited(true);
        })();
    }, [settings, inited]);

    useEffect(() => {
        if (inited) saveSettings(settings);
    }, [settings, inited]);

    const setSettings = (s: AppSettings) => {
        if (settings.language !== s.language) {
            i18n.changeLanguage(s.language);
        }
        setSettingsState(s);
    }

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
    return ctx;
};