import {FONT_SIZE_HEADER, ICON_HIT_SLOP} from "@/components/styles/global";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {useSettings} from "@/components/contexts/SettingsContext";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {RU_LANGUAGE} from "@/components/constatnts";
import {useThemePalette} from "@/components/styles/useThemedStyles";

export const LanguageToggle = ({style} : { style?: StyleProp<ViewStyle>;}) => {
    const { settings, toggleLanguage } = useSettings();
    const palette = useThemePalette();

    return (
        <TouchableOpacity onPress={toggleLanguage} style={style} hitSlop={ICON_HIT_SLOP}>
            <Text style={{fontSize: FONT_SIZE_HEADER, color: palette.text}}>
                {settings.language === RU_LANGUAGE ? '🇷🇺' : '🇺🇸'}
            </Text>
        </TouchableOpacity>
    );
}