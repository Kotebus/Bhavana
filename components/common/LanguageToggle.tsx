import {FONT_SIZE_HEADER} from "@/components/styles/global";
import {Text, TouchableOpacity} from "react-native";
import React from "react";
import {useSettings} from "@/components/contexts/SettingsContext";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export const LanguageToggle = ({style} : { style?: StyleProp<ViewStyle>;}) => {
    const { settings, toggleLanguage } = useSettings();

    return (
        <TouchableOpacity onPress={toggleLanguage} style={style}>
            <Text style={{fontSize: FONT_SIZE_HEADER}}>
                {settings.language === 'ru' ? '🇷🇺' : '🇺🇸'}
            </Text>
        </TouchableOpacity>
    );
}