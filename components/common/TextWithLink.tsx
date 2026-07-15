import {Linking, StyleSheet, Text} from "react-native";
import React, {useCallback} from "react";
import {useSettings} from "@/components/contexts/SettingsContext";
import {useThemePalette} from "@/components/styles/useThemedStyles";
import {ThemePalette} from "@/components/styles/theme";

export interface ITextWithLink {
    url: string;
    children: string;
    isRightAligned?: boolean;
}

const makeLinkStyles = (p: ThemePalette) => StyleSheet.create({
    linkButtonText: {
        color: p.link,
        textAlignVertical: 'center', // выравнивание по центру
        includeFontPadding: false,   // убирает лишние отступы Android
    },
    linkButtonTextAlignedRight: {
        color: p.link,
        alignSelf: 'flex-end',
    },
});

export const useLinkTextStyles = () => {
    const palette = useThemePalette();
    return React.useMemo(() => makeLinkStyles(palette), [palette]);
};

export const TextWithLink = ({url, children, isRightAligned = false}: ITextWithLink) => {
    const {settings} = useSettings();
    const styles = useLinkTextStyles();

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
                    styles.linkButtonTextAlignedRight :
                    styles.linkButtonText,
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
