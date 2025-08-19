import {AppNavigator} from "@/components/common/AppNavigator";
import {SettingsProvider} from "@/components/contexts/SettingsContext";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import {AudioProvider} from "@/components/contexts/AudioContext";
import {StatusBar} from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <AudioProvider>
                <SettingsProvider>
                    <I18nextProvider i18n={i18n}>
                        <StatusBar hidden/>
                        <AppNavigator/>
                    </I18nextProvider>
                </SettingsProvider>
            </AudioProvider>
        </SafeAreaView>
    );
}
