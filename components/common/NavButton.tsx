import React, {PropsWithChildren, useState} from "react";
import {Text, TouchableOpacity} from "react-native";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface INavButtonProps extends PropsWithChildren {
    navigate: () => void;
    additionalButtonStyle?: StyleProp<ViewStyle>;
}

// Module-scoped lock shared across every NavButton instance. Once any one
// of them fires navigate(), every other press anywhere in the app is
// ignored until the lock releases. Generous enough to cover the stack
// push animation (150ms) plus a buffer for the screen to settle.
const NAV_LOCK_MS = 500;
let navLocked = false;

export const NavButton = ({children, navigate, additionalButtonStyle}: INavButtonProps) => {
    const globalStyles = useGlobalStyles();
    const [, forceRerender] = useState(0);

    const handlePress = () => {
        if (navLocked) return;
        navLocked = true;
        // Visually disable the button while the lock is held.
        forceRerender(n => n + 1);
        try {
            navigate();
        } finally {
            setTimeout(() => {
                navLocked = false;
                forceRerender(n => n + 1);
            }, NAV_LOCK_MS);
        }
    };

    return (
        <TouchableOpacity
            style={[globalStyles.button, additionalButtonStyle]}
            onPress={handlePress}
            disabled={navLocked}
        >
            <Text style={globalStyles.buttonText}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}
