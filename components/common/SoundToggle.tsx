import React from "react";
import Ionicons from "@react-native-vector-icons/ionicons";
import {useSettings} from "@/components/contexts/SettingsContext";
import {TouchableOpacity} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface ISoundToggleProps {
    soundEnabled: boolean;
    toggleSound: () => void;
    style?: StyleProp<ViewStyle>;
}

export const SoundToggle = ({soundEnabled, toggleSound, style}: ISoundToggleProps) => {
    const {theme} = useSettings();
    return (
        <TouchableOpacity onPress={toggleSound} style={style}>
            <Ionicons
                name={soundEnabled ? 'volume-high' : 'volume-mute'}
                size={28}
                color={theme === 'dark' ? 'white' : 'black'}
            />
        </TouchableOpacity>
    );
}