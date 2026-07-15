import React, {useCallback} from "react";
import {Linking, TouchableOpacity, StyleSheet, Text, View} from "react-native";
import {useSettings} from "@/components/contexts/SettingsContext";
import {useThemePalette} from "@/components/styles/useThemedStyles";
import {ThemePalette} from "@/components/styles/theme";

interface IOpenURLButtonProps {
    url: string;
    deepLink?: string;
    children: string;
}

const OpenURLButton = ({url, deepLink, children}: IOpenURLButtonProps) => {
    const { settings } = useSettings();
    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);

    const handlePress = useCallback(async () => {
        if (deepLink) {
            const supportedDeepLink = await Linking.canOpenURL(deepLink);
            if (supportedDeepLink) {
                try {
                    await Linking.openURL(deepLink);
                    return;
                } catch (e) {
                    console.error('Error while oped deeplink ' + deepLink, e);
                }
            }
        }

        try {
            await Linking.openURL(url);
        } catch (e) {
            console.error('Error while oped url ' + url, e);
        }
    }, [deepLink, url]);

    return (
        <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
            <Text style={{color: '#007AFF', fontSize: settings.fontSize}}>{children}</Text>
        </TouchableOpacity>
    );
};

export interface IUrlText {
    url: string;
    deepLink?: string;
    text: string;
}

export const LinksList = ({ data }: {data: IUrlText[]})=> {
    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);
    return (
            <View style={styles.container}>
                {data.map((item, index) => (<OpenURLButton key={index} url={item.url}>{item.text}</OpenURLButton>))}
            </View>
    );
}

const makeStyles = (p: ThemePalette) => StyleSheet.create({
    container: {
        width: '100%',
    },
    linkButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: p.border,
    },
});