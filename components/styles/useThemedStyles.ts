import React from 'react';
import {useSettings} from '@/components/contexts/SettingsContext';
import {palettes, ThemePalette} from './theme';
import {createGlobalStyles} from './global';

export const useThemePalette = (): ThemePalette => {
    const {theme} = useSettings();
    return palettes[theme];
};

export const useGlobalStyles = () => {
    const palette = useThemePalette();
    return React.useMemo(() => createGlobalStyles(palette), [palette]);
};
