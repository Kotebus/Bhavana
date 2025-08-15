import React, {PropsWithChildren} from "react";
import {Text, TouchableOpacity} from "react-native";
import {globalStyles} from "@/components/styles/global";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ViewStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

interface INavButtonProps extends PropsWithChildren {
    navigate: () => void;
    additionalButtonStyle?: StyleProp<ViewStyle>;
}

export const NavButton = ({children, navigate, additionalButtonStyle}: INavButtonProps) => {
    return (
        <TouchableOpacity
            style={[globalStyles.button, additionalButtonStyle]}
            onPress={navigate}
        >
            <Text style={globalStyles.buttonText}>
                {children}
            </Text>
        </TouchableOpacity>
    );
}