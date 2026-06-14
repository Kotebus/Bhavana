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
                data={contentList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => (
                    <NavButton
                        navigate={() => navigate(item.materialKey)}
                        additionalButtonStyle={[
                            styles.button,
                            isIos && index === 0 ? styles.firstButtonIos : undefined,
                        ]}
                    >
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
    button: {
        width: '90%',
        paddingHorizontal: 5,
    },
    // globalStyles.button ships with marginTop: 30 which leaves an oversized
    // gap under BackNavHeader for the first material. Tighten only the first
    // row on iOS — pulling the whole list up with negative margin made list
    // items render under BackNavHeader during scroll.
    firstButtonIos: {
        marginTop: 10,
    },
});