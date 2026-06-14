import React, {PropsWithChildren} from "react";
import {SettingsProvider} from "@/components/contexts/SettingsContext";
import {I18nextProvider, useTranslation} from "react-i18next";
import i18n from "i18next";
import {AudioProvider} from "@/components/contexts/AudioContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import {Platform} from "react-native";
import {Stack} from "expo-router";
import {SystemBars} from "react-native-edge-to-edge";
import {useThemePalette} from "@/components/styles/useThemedStyles";
import {useSettings} from "@/components/contexts/SettingsContext";

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
                animation: 'ios_from_right',
                animationDuration: 150,
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

// Paints the area behind the system bars (status + nav) with palette.background
// on Android, so we don't see the default white Activity window peek through.
// On iOS no wrapper is needed — the parent UIWindow already shows our content.
const ThemedShell = ({children}: PropsWithChildren) => {
    const palette = useThemePalette();
    const {theme} = useSettings();
    if (Platform.OS !== 'android') return <>{children}</>;
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: palette.background}}>
            {/* SystemBars from react-native-edge-to-edge keeps both bars fully
                transparent (so palette.background shows through) and only
                controls the icon tint. Status bar icons match the theme:
                dark icons in light theme, light icons in dark theme. */}
            <SystemBars style={theme === 'dark' ? 'light' : 'dark'} hidden={{statusBar: true, navigationBar: false}}/>
            {children}
        </SafeAreaView>
    );
};

const AppContainer = () => {
    return (
        <AudioProvider>
            <SettingsProvider>
                <I18nextProvider i18n={i18n}>
                    <ThemedShell>
                        <RootStack/>
                    </ThemedShell>
                </I18nextProvider>
            </SettingsProvider>
        </AudioProvider>
    );
};

export default function RootLayout() {
    return <AppContainer/>;
}
