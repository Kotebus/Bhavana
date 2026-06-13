import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Octicons from '@react-native-vector-icons/octicons';
import {useSettings} from '@/components/contexts/SettingsContext';

interface IThemeToggleProps {
    style?: StyleProp<ViewStyle>;
    size?: number;
}

// Icon colors are inverted relative to the theme background so they stay
// visible: black sun on the light background, white moon on the dark one.
// Hardcoded literals match the original spec exactly.
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
