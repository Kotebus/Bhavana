import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import TextSizeControl from "@/components/TextSizeControl";

interface ISizeAndBackNavHeader {
    onBack: () => void;
    onChangeSize: (size: number) => void;
}

export default function SizeAndBackNavHeader({onChangeSize, onBack}: ISizeAndBackNavHeader) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <TextSizeControl onChange={onChangeSize} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingBottom: 10,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: 4 }],
        padding: 5,
    }
});
