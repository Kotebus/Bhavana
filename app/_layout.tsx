import {SettingsProvider} from "@/components/contexts/SettingsContext";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import {AudioProvider} from "@/components/contexts/AudioContext";
import {StatusBar} from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Platform} from "react-native";
import {Slot} from "expo-router";

const AppContainer = () => {
    return (
        <AudioProvider>
            <SettingsProvider>
                <I18nextProvider i18n={i18n}>
                    <StatusBar hidden/>
                    <Slot/>
                </I18nextProvider>
            </SettingsProvider>
        </AudioProvider>
    );
}

export default function RootLayout() {
    const isIos = Platform.OS === 'ios';

    if (isIos) return (<AppContainer />);

    return (
        <SafeAreaView style={{flex: 1}}>
            <AppContainer />
        </SafeAreaView>
    );
}
