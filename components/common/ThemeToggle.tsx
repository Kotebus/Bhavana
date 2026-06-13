import React from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import Octicons from '@react-native-vector-icons/octicons';
import {useSettings} from '@/components/contexts/SettingsContext';
import {useThemePalette} from '@/components/styles/useThemedStyles';

interface IThemeToggleProps {
    style?: StyleProp<ViewStyle>;
    size?: number;
}

export const ThemeToggle = ({style, size = 24}: IThemeToggleProps) => {
    const {theme, toggleTheme} = useSettings();
    const palette = useThemePalette();
    return (
        <TouchableOpacity
            onPress={toggleTheme}
            style={style}
            accessibilityRole="button"
            accessibilityLabel="Toggle theme"
        >
            {theme === 'light'
                ? <Octicons name="sun" size={size} color={palette.icon}/>
                : <Octicons name="moon" size={size} color={palette.icon}/>}
        </TouchableOpacity>
    );
};
