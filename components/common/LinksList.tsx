import React, {useCallback} from "react";
import {Linking, TouchableOpacity, StyleSheet, Text, View} from "react-native";
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";

interface IOpenURLButtonProps {
    url: string;
    deepLink?: string;
    children: string;
}

const OpenURLButton = ({url, deepLink, children}: IOpenURLButtonProps) => {
    const handlePress = useCallback(async () => {
        if (deepLink) {
            const supportedDeepLink = await Linking.canOpenURL(deepLink);
            if (supportedDeepLink) {
                await Linking.openURL(deepLink);
                return;
            }
        }

        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        }
    }, [deepLink, url]);

    return (
        <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
            <Text style={styles.linkButtonText}>{children}</Text>
        </TouchableOpacity>
    );
};

export interface IUrlText {
    url: string;
    deepLink?: string;
    text: string;
}

export const LinksList = ({ data }: {data: IUrlText[]})=> {
    return (
            <View style={styles.container}>
                {data.map((item, index) => (<OpenURLButton key={index} url={item.url}>{item.text}</OpenURLButton>))}
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    linkButton: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    linkButtonText: {
        fontSize: FONT_SIZE_DEFAULT,
        color: '#007AFF',
    },
});