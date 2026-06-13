import React from 'react';
import {useSettings} from '@/components/contexts/SettingsContext';
import {palettes, Theme, ThemePalette} from './theme';
import {createGlobalStyles} from './global';

const resolveTheme = (t: Theme | undefined): Theme => t ?? 'light';

export const useThemePalette = (): ThemePalette => {
    const {settings} = useSettings();
    return palettes[resolveTheme(settings.theme)];
};

export const useGlobalStyles = () => {
    const palette = useThemePalette();
    return React.useMemo(() => createGlobalStyles(palette), [palette]);
};
