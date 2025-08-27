import {Linking, StyleSheet, Text} from "react-native";
import React, {useCallback} from "react";
import {useSettings} from "@/components/contexts/SettingsContext";

export interface ITextWithLink {
    url: string;
    children: string;
    isRightAligned?: boolean;
}

export const TextWithLink = ({url, children, isRightAligned = false}: ITextWithLink) => {
    const {settings} = useSettings();

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
        <Text
            style={[
                isRightAligned ?
                    textWithLinkStyles.linkButtonTextAlignedRight :
                    textWithLinkStyles.linkButtonText,
                {
                    fontSize: settings.fontSize,
                }
            ]}
              onPress={handlePress}
        >
            {children}
        </Text>
    );
};

export const textWithLinkStyles = StyleSheet.create({
    linkButtonText: {
        color: '#007AFF',
        textAlignVertical: 'center', // выравнивание по центру
        includeFontPadding: false,   // убирает лишние отступы Android
    },
    linkButtonTextAlignedRight: {
        color: '#007AFF',
        alignSelf: 'flex-end',
    },
});