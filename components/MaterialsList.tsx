import React from 'react';
import {View, FlatList, StyleSheet, Platform} from 'react-native';
import {useNavigation} from "expo-router";
import {useTranslation} from "react-i18next";
import {IMaterial} from "@/components/screens/materials/SermonsRoutingList";
import BackNavHeader from "@/components/BackNavHeader";
import {NavButton} from "@/components/NavButton";
import {MaterialKey} from "@/components/i18n";
import {globalStyles} from "@/components/styles/global";

export interface IMaterialsListProps {
    contentList: IMaterial[];
    navigate: (materialKey: MaterialKey) => void;
}

export const MaterialsList = ({ contentList, navigate } : IMaterialsListProps)=> {
    const navigation = useNavigation();
    const {t} = useTranslation();

    const isIos = Platform.OS === 'ios';
    const containerStyles = [globalStyles.container, isIos ? styles.containerIos : undefined];
    return (
        <View style={containerStyles}>
            {isIos && <BackNavHeader onBack={() => navigation.goBack()}/>}
            <FlatList
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
        marginTop: 16
    },
    button: {
        width: '90%',
        paddingHorizontal: 5
    }
});