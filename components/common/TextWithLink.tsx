import {Linking, StyleSheet, Text} from "react-native";
import React, {useCallback} from "react";
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";

export interface ITextWithLink {
    url: string;
    children: string;
    isRightAligned?: boolean;
}

export const TextWithLink = ({url, children, isRightAligned = false}: ITextWithLink) => {
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
        <Text style={isRightAligned ? textWithLinkStyles.linkButtonTextAlignedRight : textWithLinkStyles.linkButtonText} onPress={handlePress}>
            {children}
        </Text>
    );
};

export const textWithLinkStyles = StyleSheet.create({
    linkButtonText: {
        fontSize: FONT_SIZE_DEFAULT,
        color: '#007AFF',
        textAlignVertical: 'center', // выравнивание по центру
        includeFontPadding: false,   // убирает лишние отступы Android
    },
    linkButtonTextAlignedRight: {
        fontSize: FONT_SIZE_DEFAULT,
        color: '#007AFF',
        alignSelf: 'flex-end',
    },
});