import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";
import {globalStyles} from "../styles/global";
import {sermonsRoutingList} from "./sermons/SermonsRoutingList";
import {SermonKey} from "../i18n";
import {RootStackParamList} from "@/components/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'StudyScreen'>;

export default function StudyScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();

    const navigateToSermon = (sermonKey: SermonKey) => navigation.navigate('SermonScreen', {sermonKey: sermonKey, language: language});

    return (
        <View
            style={styles.container}
        >
            <FlatList
                data={sermonsRoutingList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity
                        onPress={() => navigateToSermon(item.sermonKey)}
                        style={[globalStyles.button, {width: '90%'}]}
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
});