import React, {PropsWithChildren} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import Ionicons from "@react-native-vector-icons/ionicons";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemePalette} from '@/components/styles/useThemedStyles';

interface ISizeAndBackNavHeader extends PropsWithChildren{
    onBack: () => void;
}

export default function BackNavHeader({onBack, children}: ISizeAndBackNavHeader) {
    const palette = useThemePalette();
    const insets = useSafeAreaInsets();
    const isIos = Platform.OS === 'ios';
    // On iOS the screen extends behind the status bar / notch / Dynamic Island,
    // so push the back-arrow row down by the real safe-area top inset (a
    // hard-coded 15 dropped the arrow into the unreachable notch area on
    // modern iPhones).
    const containerStyles = [
        styles.container,
        isIos ? {marginTop: insets.top} : undefined,
    ];
    return (
        <View style={containerStyles}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
                <Ionicons name="arrow-back-outline" size={24} color={palette.icon} />
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
        marginBottom: 10,
    },
    backButton: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: 4 }],
        padding: 5,
    }
});
