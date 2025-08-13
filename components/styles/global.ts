import { StyleSheet } from 'react-native';

const COLORS = {
    background: '#FFFFFF',
    titleText: '#000000',
    text: '#ffffff',
    primary: '#000000',
    secondary: '#2196F3',
    buttonText: '#FFFFFF',
} as const;

export const FONT_SIZE_DEFAULT = 16;
export const FONT_SIZE_HEADER = 24;

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        color: COLORS.text,
        padding: 16,
        justifyContent: 'center',
    },
    commonContainer: {
        flex: 1,
        padding: 16,
    },
    title: {
        color: COLORS.titleText,
        fontSize: FONT_SIZE_HEADER,
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        color: COLORS.text,
        fontSize: FONT_SIZE_DEFAULT,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 30,
        width: '70%',
    },
    buttonText: {
        color: COLORS.buttonText,
        fontSize: FONT_SIZE_DEFAULT,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconButton: {
        color: COLORS.primary,
        marginLeft: 15,
    },
});