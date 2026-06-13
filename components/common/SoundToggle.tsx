import React from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";
import {TouchableOpacity} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface ISoundToggleProps {
    soundEnabled: boolean;
    toggleSound: () => void;
    style?: StyleProp<ViewStyle>;
}

export const SoundToggle = ({soundEnabled, toggleSound, style}: ISoundToggleProps) => {
    const globalStyles = useGlobalStyles();
    return (
        <TouchableOpacity onPress={toggleSound} style={style}>
            <Ionicons
                name={soundEnabled ? 'volume-high' : 'volume-mute'}
                size={28}
                color={globalStyles.iconButton.color}
            />
        </TouchableOpacity>
    );
}