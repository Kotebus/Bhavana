import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useSettings} from "@/components/contexts/SettingsContext";
import {FONT_SIZE_DEFAULT, FONT_SIZE_HEADER} from "@/components/styles/global";
import {useThemePalette} from '@/components/styles/useThemedStyles';
import {ThemePalette} from '@/components/styles/theme';

interface ITextSizeControlProps {
    min?: number;
    max?: number;
    step?: number;
    onChange: (size: number) => void;
}

export default function TextSizeControl({
                                            min = 12,
                                            max = 28,
                                            step = 1,
                                            onChange,
                                        }: ITextSizeControlProps) {
    const { settings, setSettings } = useSettings();
    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);
    const value = settings.fontSize;

    const updateFontSize = (newVal: number) => {
        onChange(newVal);
        setSettings({...settings, fontSize: newVal});
    }
    const decrease = () => updateFontSize(Math.max(min, value - step));
    const increase = () => updateFontSize(Math.min(max, value + step));

    return (
        <>
            <TouchableOpacity onPress={decrease} style={styles.button}>
                <Text style={styles.buttonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.value}>{value}px</Text>

            <TouchableOpacity onPress={increase} style={styles.button}>
                <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
        </>
    );
}

const makeStyles = (p: ThemePalette) => StyleSheet.create({
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: p.controlBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: FONT_SIZE_HEADER,
        fontWeight: 'bold',
        color: p.controlText,
    },
    value: {
        fontSize: FONT_SIZE_DEFAULT,
        fontWeight: '500',
        color: p.controlText,
        minWidth: 50,
        textAlign: 'center',
    },
});
