import {StyleSheet} from 'react-native';
import {lightTheme, ThemePalette} from './theme';

export const FONT_SIZE_DEFAULT = 16;
export const FONT_SIZE_HEADER = 24;

// Touch target padding around icon-only toggles. Brings the effective
// hit area closer to the 48dp Material / HIG recommendation without
// changing the layout.
export const ICON_HIT_SLOP = 10;

export const createGlobalStyles = (p: ThemePalette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: p.background,
            color: p.text,
            paddingHorizontal: 16,
            justifyContent: 'center',
        },
        scrollContainer: {
            flexGrow: 1,
            paddingHorizontal: 16,
            backgroundColor: p.background,
        },
        scrollContainerIos: {
            paddingHorizontal: 16,
            paddingBottom: 16,
            backgroundColor: p.background,
        },
        contentContainerStyle: {
            flexGrow: 1,
            justifyContent: 'center',
            paddingTop: 20,
            padding: 10,
            backgroundColor: p.background,
        },
        title: {
            color: p.title,
            fontSize: FONT_SIZE_HEADER,
            textAlign: 'center',
            marginBottom: 20,
        },
        text: {
            color: p.text,
            fontSize: FONT_SIZE_DEFAULT,
        },
        button: {
            backgroundColor: p.buttonBg,
            paddingVertical: 16,
            borderRadius: 8,
            alignSelf: 'center',
            marginTop: 30,
            width: '80%',
        },
        buttonText: {
            color: p.buttonText,
            fontSize: FONT_SIZE_DEFAULT,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        iconButton: {
            color: p.icon,
            marginLeft: 15,
        },
    });

// Legacy export — kept for screens not yet migrated to useGlobalStyles().
// Always reflects the light theme. Remove once all consumers use the hook.
export const globalStyles = createGlobalStyles(lightTheme);
