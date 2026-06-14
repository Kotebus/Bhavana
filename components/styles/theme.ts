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
    pickerBorder: string;
    pickerSurface: string;
    pickerText: string;
    link: string;
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
    pickerBorder: '#000000',
    pickerSurface: '#EEEEEE',
    pickerText: '#000000',
    link: '#2563EB',
};

export const darkTheme: ThemePalette = {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#EDEDED',
    title: '#FFFFFF',
    subtleText: '#A0A0A0',
    border: '#333333',
    icon: '#FFFFFF',
    // Softer than pure white-on-dark, which felt aggressive. The button
    // sits one tonal step above the background/surface so it still reads
    // as a tappable surface without overpowering the screen.
    buttonBg: '#2A2A2A',
    buttonText: '#EDEDED',
    controlBg: '#2A2A2A',
    controlText: '#EDEDED',
    navContentBg: '#121212',
    headerTint: '#FFFFFF',
    markdownText: '#EDEDED',
    markdownHeading: '#FFFFFF',
    pickerSelection: '#333333',
    pickerBorder: '#333333',
    // Brighter than the regular controlBg (#2A2A2A) so the picker visibly
    // sits on top of the page. Text matches the regular dark-theme text
    // tone (#EDEDED) — pure white felt too aggressive against #3A3A3A.
    pickerSurface: '#3A3A3A',
    pickerText: '#EDEDED',
    // Lighter blue than the default #2563EB so it's readable against the
    // #121212 background without being a tiny dim glyph.
    link: '#60A5FA',
};

export const palettes: Record<Theme, ThemePalette> = {
    light: lightTheme,
    dark: darkTheme,
};
