import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import {useSettings} from "@/components/contexts/SettingsContext";

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

const styles = StyleSheet.create({
    button: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    value: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        minWidth: 50,
        textAlign: 'center',
    },
});
