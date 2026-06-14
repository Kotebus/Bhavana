import React, {PropsWithChildren, useRef} from "react";
import {Text, TouchableOpacity} from "react-native";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface INavButtonProps extends PropsWithChildren {
    navigate: () => void;
    additionalButtonStyle?: StyleProp<ViewStyle>;
}

// Window in which a second tap is treated as the same intent and ignored.
// Generous enough to cover the stack push animation (150ms) + a bit of slack.
const REPEAT_PRESS_GUARD_MS = 500;

export const NavButton = ({children, navigate, additionalButtonStyle}: INavButtonProps) => {
    const globalStyles = useGlobalStyles();
    const lastPressRef = useRef(0);

    const handlePress = () => {
        const now = Date.now();
        if (now - lastPressRef.current < REPEAT_PRESS_GUARD_MS) return;
        lastPressRef.current = now;
        navigate();
    };

    return (
        <TouchableOpacity
            style={[globalStyles.button, additionalButtonStyle]}
            onPress={handlePress}
        >
            <Text style={globalStyles.buttonText}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
