export type Theme = 'light' | 'dark';

export interface ThemePalette {
    background: string;
    surface: string;
    text: string;
    title: string;
    subtleText: string;
    border: string;
    icon: string;
    buttonBg: string;
    buttonText: string;
    controlBg: string;
    controlText: string;
    navContentBg: string;
    headerTint: string;
    markdownText: string;
    markdownHeading: string;
    pickerSelection: string;
}

export const lightTheme: ThemePalette = {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    title: '#000000',
    subtleText: '#666666',
    border: '#CCCCCC',
    icon: '#000000',
    buttonBg: '#000000',
    buttonText: '#FFFFFF',
    controlBg: '#EEEEEE',
    controlText: '#333333',
    navContentBg: '#FFFFFF',
    headerTint: '#000000',
    markdownText: '#000000',
    markdownHeading: '#000000',
    pickerSelection: 'lightgrey',
};

export const darkTheme: ThemePalette = {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#EDEDED',
    title: '#FFFFFF',
    subtleText: '#A0A0A0',
    border: '#333333',
    icon: '#FFFFFF',
    buttonBg: '#FFFFFF',
    buttonText: '#000000',
    controlBg: '#2A2A2A',
    controlText: '#EDEDED',
    navContentBg: '#121212',
    headerTint: '#FFFFFF',
    markdownText: '#EDEDED',
    markdownHeading: '#FFFFFF',
    pickerSelection: '#333333',
};

export const palettes: Record<Theme, ThemePalette> = {
    light: lightTheme,
    dark: darkTheme,
};
