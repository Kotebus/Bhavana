import React, {useCallback} from "react";
import {Linking, TouchableOpacity, StyleSheet, Text, View} from "react-native";
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";

interface IOpenURLButtonProps {
    url: string;
    children: string;
}

const OpenURLButton = ({url, children}: IOpenURLButtonProps) => {
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
        <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
            <Text style={styles.linkButtonText}>{children}</Text>
        </TouchableOpacity>
    );
};

export interface IUrlText {
    url: string;
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