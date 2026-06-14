import {SettingsProvider} from "@/components/contexts/SettingsContext";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "i18next";
import {AudioProvider} from "@/components/contexts/AudioContext";
import {StatusBar} from "expo-status-bar";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Platform} from "react-native";
import {Stack} from "expo-router";
import {useThemePalette} from "@/components/styles/useThemedStyles";

const RootStack = () => {
    const palette = useThemePalette();
    const {t} = useTranslation();
    const isIos = Platform.OS === 'ios';
    return (
        <Stack
            screenOptions={{
                headerTitleAlign: 'center',
                contentStyle: {backgroundColor: palette.navContentBg},
                headerStyle: {backgroundColor: palette.navContentBg},
                headerTintColor: palette.headerTint,
                animation: 'fade',
            }}>
            <Stack.Screen name="index" options={{headerShown: false}}/>
            <Stack.Screen name="meditation" options={{headerShown: false}}/>
            <Stack.Screen name="settings" options={{headerShown: false}}/>
            <Stack.Screen name="materials" options={{headerShown: false}}/>
            <Stack.Screen name="material/[key]" options={{headerShown: false}}/>
            <Stack.Screen name="about-project" options={{headerShown: false}}/>
            <Stack.Screen name="about/index" options={{headerShown: isIos, title: t('AboutScreen')}}/>
            <Stack.Screen name="about/teacher" options={{headerShown: isIos, title: t('AboutTeacherScreen')}}/>
            <Stack.Screen name="about/sermons" options={{headerShown: isIos, title: t('AboutSermonsScreen')}}/>
            <Stack.Screen name="about/monastery" options={{headerShown: isIos, title: t('AboutMonasteryScreen')}}/>
            <Stack.Screen name="about/links" options={{headerShown: false}}/>
        </Stack>
    );
};

const AppContainer = () => {
    return (
        <AudioProvider>
            <SettingsProvider>
                <I18nextProvider i18n={i18n}>
                    <StatusBar hidden/>
                    <RootStack/>
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
