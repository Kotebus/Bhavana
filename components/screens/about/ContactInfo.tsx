import {useTranslation} from "react-i18next";
import {Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";
import {useThemePalette} from "@/components/styles/useThemedStyles";
import {ThemePalette} from "@/components/styles/theme";

export const ContactInfo = () => {
    const {t} = useTranslation();
    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);

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


const makeStyles = (p: ThemePalette) => StyleSheet.create({
    contactBlock: {
        marginTop: 20,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: p.border,
        paddingVertical: 16,
    },
    contactLabel: {
        fontSize: FONT_SIZE_DEFAULT,
        fontWeight: '500',
        marginBottom: 5,
        color: p.text,
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
        color: p.subtleText,
    },
});