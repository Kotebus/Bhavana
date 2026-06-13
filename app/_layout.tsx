import {AppNavigator} from "@/components/common/AppNavigator";
import {SettingsProvider} from "@/components/contexts/SettingsContext";
import {I18nextProvider} from "react-i18next";
import i18n from "i18next";
import {AudioProvider} from "@/components/contexts/AudioContext";
import {StatusBar} from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Platform} from "react-native";
import {useFonts} from "expo-font";
import {AntDesign, Ionicons, Octicons} from "@expo/vector-icons";
import {useEffect} from "react";

const AppContainer = () => {
    return (
        <AudioProvider>
            <SettingsProvider>
                <I18nextProvider i18n={i18n}>
                    <StatusBar hidden/>
                    <AppNavigator/>
                </I18nextProvider>
            </SettingsProvider>
        </AudioProvider>
    );
}

export default function RootLayout() {
    const isIos = Platform.OS === 'ios';

    // Explicitly preload vector-icon fonts so they're guaranteed to be
    // registered before any icon component renders. We deliberately do
    // not block rendering on the result: if loading fails the app still
    // boots (icons may stay invisible, but the rest works) and the error
    // is surfaced via console.warn so we can read it from logcat.
    const [fontsLoaded, fontsError] = useFonts({
        ...Ionicons.font,
        ...Octicons.font,
        ...AntDesign.font,
    });

    useEffect(() => {
        if (fontsError) {
            console.warn('vector-icons font load failed', fontsError);
        } else if (fontsLoaded) {
            console.log('vector-icons fonts loaded');
        }
    }, [fontsLoaded, fontsError]);

    if (isIos) return (<AppContainer />);

    return (
        <SafeAreaView style={{flex: 1}}>
            <AppContainer />
        </SafeAreaView>
    );
}
