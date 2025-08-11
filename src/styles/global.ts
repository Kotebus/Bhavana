import { StyleSheet } from 'react-native';

const COLORS = {
    background: '#FFFFFF',
    titleText: '#000000',
    text: '#ffffff',
    primary: '#000000',
    secondary: '#2196F3',
    buttonText: '#FFFFFF',
} as const;

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        color: COLORS.text,
        padding: 16,
        justifyContent: 'center',
    },
    title: {
        color: COLORS.titleText,
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    text: {
        color: COLORS.text,
        fontSize: 16,
    },
    button: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignSelf: 'center',
        marginTop: 30,
        width: '70%',
    },
    buttonText: {
        color: COLORS.buttonText,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    iconButton: {
        color: COLORS.primary,
        marginLeft: 15,
    },
});