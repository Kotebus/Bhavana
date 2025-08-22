import { StyleSheet } from 'react-native';

//TODO: move all colors to constants
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
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: 16,
    },
    scrollContainerIos: {
        padding: 16,
    },
    contentContainerStyle: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingTop: 20,
        padding: 10
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
        paddingVertical: 16,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 30,
        width: '80%',
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