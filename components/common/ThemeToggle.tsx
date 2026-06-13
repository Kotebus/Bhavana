import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Octicons from '@expo/vector-icons/Octicons';
import {useSettings} from '@/components/contexts/SettingsContext';

interface IThemeToggleProps {
    style?: StyleProp<ViewStyle>;
    size?: number;
}

// The original spec asked for AntDesign "sun" + Octicons "moon",
// but @expo/vector-icons@14.1.0 has no "sun" glyph in AntDesign.
// Using Octicons for both keeps the visual family consistent.
export const ThemeToggle = ({style, size = 24}: IThemeToggleProps) => {
    const {theme, toggleTheme} = useSettings();
    return (
        <TouchableOpacity
            onPress={toggleTheme}
            style={style}
            accessibilityRole="button"
            accessibilityLabel="Toggle theme"
        >
            {theme === 'light'
                ? <Octicons name="sun" size={size} color="black"/>
                : <Octicons name="moon" size={size} color="white"/>}
        </TouchableOpacity>
    );
};
