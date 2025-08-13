import React, {PropsWithChildren} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

interface ISizeAndBackNavHeader extends PropsWithChildren{
    onBack: () => void;
}

export default function BackNavHeader({onBack, children}: ISizeAndBackNavHeader) {
    const isIos = Platform.OS === 'ios';
    const containerStyles = [
        styles.container,
        isIos ? styles.containerIos : undefined,
    ];
    return (
        <View style={containerStyles}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </TouchableOpacity>
            {children}
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
    containerIos: {
        marginTop: 15,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: 4 }],
        padding: 5,
    }
});
