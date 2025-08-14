import React, {useCallback} from "react";
import {Linking, TouchableOpacity, StyleSheet, Text, View, ScrollView, Platform} from "react-native";
import {FONT_SIZE_DEFAULT, globalStyles} from "@/components/styles/global";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";
import BackNavHeader from "@/components/BackNavHeader";

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

type Props = NativeStackScreenProps<RootStackParamList, 'LinksListScreen'>;

export default function LinksListScreen({ navigation }: Props) {
    const isIos = Platform.OS === 'ios';
    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {isIos && <BackNavHeader onBack={() => navigation.goBack()}/>}
            <View style={styles.contactsContainer}>
                <OpenURLButton url={'https://theravada.ru/'}>theravada.ru</OpenURLButton>
                <OpenURLButton url={'https://samatha-vipassana.com/'}>samatha-vipassana.com</OpenURLButton>
                <OpenURLButton url={'http://t.me/chittaviveka'}>Telegram: @chittaviveka</OpenURLButton>
                <OpenURLButton url={'https://www.instagram.com/chittaviveka.monastery'}>Instagram: @chittaviveka</OpenURLButton>
                <OpenURLButton url={'https://www.facebook.com/chittaviveka'}>Facebook: Chittaviveka Monastery</OpenURLButton>
                <OpenURLButton url={'https://www.youtube.com/@ChittaViveka'}>Youtube Буддизм Тхеравада</OpenURLButton>
                <OpenURLButton url={'https://vk.com/dhammatheravada'}>VK Dhamma Theravada</OpenURLButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

    contactsContainer: {
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