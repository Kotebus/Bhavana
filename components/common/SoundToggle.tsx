import React from "react";
import {Ionicons} from "@expo/vector-icons";
import {globalStyles} from "@/components/styles/global";
import {TouchableOpacity} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface ISoundToggleProps {
    soundEnabled: boolean;
    toggleSound: () => void;
    style?: StyleProp<ViewStyle>;
}

export const SoundToggle = ({soundEnabled, toggleSound, style}: ISoundToggleProps) => {
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