import React from 'react';
import {View, FlatList, StyleSheet, Platform} from 'react-native';
import {router} from "expo-router";
import {useTranslation} from "react-i18next";
import {IMaterial} from "@/components/screens/materials/SermonsRoutingList";
import BackNavHeader from "@/components/common/BackNavHeader";
import {NavButton} from "@/components/common/NavButton";
import {MaterialKey} from "@/components/i18n";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";

export interface IMaterialsListProps {
    contentList: IMaterial[];
    navigate: (materialKey: MaterialKey) => void;
}

export const MaterialsList = ({ contentList, navigate } : IMaterialsListProps)=> {
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();

    const isIos = Platform.OS === 'ios';
    const containerStyles = [globalStyles.container, isIos ? styles.containerIos : undefined];
    return (
        <View style={containerStyles}>
            {isIos && <BackNavHeader onBack={() => router.back()}/>}
            <FlatList
                style={isIos ? styles.listIos : undefined}
                data={contentList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <NavButton navigate={() => navigate(item.materialKey)} additionalButtonStyle={styles.button}>
                        {t(item.materialKey)}
                    </NavButton>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    containerIos: {
        paddingBottom: 32
    },
    // The first NavButton ships with marginTop: 30 from globalStyles.button,
    // which on iOS leaves an oversized gap under BackNavHeader. Pull the list
    // up so the first item sits closer to the back arrow.
    listIos: {
        marginTop: -20,
    },
    button: {
        width: '90%',
        paddingHorizontal: 5,
    }
});