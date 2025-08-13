import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {Linking, Text, TextStyle} from "react-native";
import React, {useCallback} from "react";

export interface ITextWithLink {
    url: string;
    children: string;
    textStyle?: StyleProp<TextStyle>;
}

export const TextWithLink = ({url, children, textStyle}: ITextWithLink) => {
    const handlePress = useCallback(async () => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        }
    }, [url]);

    return (
        <Text style={textStyle} onPress={handlePress}>
            {children}
        </Text>
    );
};