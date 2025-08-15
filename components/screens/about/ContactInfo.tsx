import {useTranslation} from "react-i18next";
import {Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";

export const ContactInfo = () => {
    const {t} = useTranslation();

    const openTelegram = () => Linking.openURL('https://t.me/Max_Kotebus');
    const openEmail = () => Linking.openURL('mailto:kotebus666@gmail.com');

    return (
        <View style={styles.contactBlock}>
            <Text style={styles.contactLabel}>{t('contactDeveloper')}{' '}{t('MyNameIs')}</Text>
            <View style={styles.contactRow}>
                <TouchableOpacity onPress={openTelegram}>
                    <Text style={styles.link}>tg @Max_Kotebus</Text>
                </TouchableOpacity>
                <Text style={styles.separator}>|</Text>
                <TouchableOpacity onPress={openEmail}>
                    <Text style={styles.link}>email</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    contactBlock: {
        marginTop: 20,
        alignItems: 'center',
    },
    contactLabel: {
        fontSize: FONT_SIZE_DEFAULT,
        fontWeight: '500',
        marginBottom: 5,
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    link: {
        fontSize: FONT_SIZE_DEFAULT,
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    separator: {
        marginHorizontal: 8,
        fontSize: FONT_SIZE_DEFAULT,
        color: '#888',
    },
});