import React from 'react';
import {View, FlatList, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";
import {globalStyles} from "../styles/global";
import {sermonsRoutingList} from "./sermons/SermonsRoutingList";
import {SermonKey} from "../i18n";
import {RootStackParamList} from "@/components/AppNavigator";
import BackNavHeader from "@/components/BackNavHeader";

type Props = NativeStackScreenProps<RootStackParamList, 'StudyScreen'>;

export default function StudyScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();

    const navigateToSermon = (sermonKey: SermonKey) => navigation.navigate('SermonScreen', {sermonKey: sermonKey, language: language});

    const isIos = Platform.OS === 'ios';
    const containerStyles = [styles.container, isIos ? styles.containerIos : undefined];
    return (
        <View style={containerStyles}>
            {isIos && <BackNavHeader onBack={() => navigation.goBack()}/>}
            <FlatList
                data={sermonsRoutingList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigateToSermon(item.sermonKey)}
                        style={[globalStyles.button, styles.button]}
                    >
                        <Text style={globalStyles.buttonText}>
                            {t(item.sermonKey)}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    containerIos: {
        marginTop: 16
    },
    button: {
        width: '90%',
        paddingHorizontal: 5
    }
});