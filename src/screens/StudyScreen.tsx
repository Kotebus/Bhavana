import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Language} from "../storage/storage";
import {RootStackParamList} from "../components/AppNavigator";
import {useTranslation} from "react-i18next";
import {globalStyles} from "../styles/global";

interface ISermon {
    id: number;
    titleLocalisationKey: string;
    link: keyof RootStackParamList;
}
const sermonsList:ISermon[] = [
    {
        id: 0,
        titleLocalisationKey: 'PanchaNivaranaScreen',
        link: 'PanchaNivaranaScreen'
    },
    {
        id: 1,
        titleLocalisationKey: 'SantaSukhaScreen',
        link: 'SantaSukhaScreen'
    },
];

type Props = NativeStackScreenProps<RootStackParamList, 'StudyScreen'>;

export default function StudyScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();

    return (
        <View
            style={styles.container}
        >
            <FlatList
                data={sermonsList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() =>
                        // @ts-ignore
                        navigation.navigate(item.link, {language: language as Language})
                    }
                        style={[globalStyles.button, {width: '90%'}]}
                    >
                        <Text style={[globalStyles.buttonText, { fontSize: 18 }]}>
                            {t(item.titleLocalisationKey)}
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
import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Language} from "../storage/storage";
import {RootStackParamList} from "../components/AppNavigator";
import {useTranslation} from "react-i18next";
import {globalStyles} from "../styles/global";

interface ISermon {
    id: number;
    titleLocalisationKey: string;
    link: keyof RootStackParamList;
}
const sermonsList:ISermon[] = [
    {
        id: 0,
        titleLocalisationKey: 'PanchaNivaranaScreen',
        link: 'PanchaNivaranaScreen'
    },
    {
        id: 1,
        titleLocalisationKey: 'SantaSukhaScreen',
        link: 'SantaSukhaScreen'
    },
];

type Props = NativeStackScreenProps<RootStackParamList, 'StudyScreen'>;

export default function StudyScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const {t} = useTranslation();

    return (
        <View
            style={styles.container}
        >
            <FlatList
                data={sermonsList}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() =>
                        // @ts-ignore
                        navigation.navigate(item.link, {language: language as Language})
                    }
                        style={[globalStyles.button, {width: '90%'}]}
                    >
                        <Text style={[globalStyles.buttonText, { fontSize: 18 }]}>
                            {t(item.titleLocalisationKey)}
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
