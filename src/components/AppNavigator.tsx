import React from "react";
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

import {ITime, Language} from "../storage/storage";

import HomeScreen from "../screens/HomeScreen";
import MeditationScreen from "../screens/MeditationScreen";
import AboutScreen from "../screens/AboutScreen";
import StudyScreen from "../screens/StudyScreen";
import SermonScreen from "../screens/SermonScreen";

export interface IPropsWithLanguage {
    language: Language;
}

export interface ISermonProps {
    sermonKey: string;
    language: Language;
}
export type RootStackParamList = {
    HomeScreen: undefined;
    MeditationScreen: ITime;
    AboutScreen: IPropsWithLanguage;
    StudyScreen: IPropsWithLanguage;
    SermonScreen: ISermonProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const {t} = useTranslation();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title: t('HomeScreen')}}/>
                <Stack.Screen name="MeditationScreen" component={MeditationScreen}
                              options={{title: t('MeditationScreen')}}/>
                <Stack.Screen name="AboutScreen" component={AboutScreen} options={{title: t('AboutScreen')}}/>
                <Stack.Screen name="StudyScreen" component={StudyScreen} options={{title: t('StudyScreen')}}/>
                <Stack.Screen name="SermonScreen" component={SermonScreen} options={{title: '🪷'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}