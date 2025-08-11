import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';

import { SettingsProvider } from './src/contexts/SettingsContext';
import {AudioProvider} from "./src/contexts/AudioContext";
import {AppNavigator} from "./src/components/AppNavigator";

export default function App() {
    return (
        // <ThemeProvider>
            <AudioProvider>
                <SettingsProvider>
                    <I18nextProvider i18n={i18n}>
                        <AppNavigator/>
                    </I18nextProvider>
                </SettingsProvider>
            </AudioProvider>
        // </ThemeProvider>
    );
}