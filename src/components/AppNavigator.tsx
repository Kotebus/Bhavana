import React from "react";
import {useTranslation} from 'react-i18next';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";

import {ITime, Language} from "../storage/storage";

import HomeScreen from "../screens/HomeScreen";
import MeditationScreen from "../screens/MeditationScreen";
import AboutScreen from "../screens/AboutScreen";
import StudyScreen from "../screens/StudyScreen";
import PanchaNivaranaScreen from "../screens/sermons/PanchaNivaranaScreen";
import SantaSukhaScreen from "../screens/sermons/SantaSukhaScreen";

export interface IPropsWithLanguage {
    language: Language;
}

export type RootStackParamList = {
    HomeScreen: undefined;
    MeditationScreen: ITime;
    AboutScreen: IPropsWithLanguage;
    StudyScreen: IPropsWithLanguage;
    PanchaNivaranaScreen: IPropsWithLanguage;
    SantaSukhaScreen: IPropsWithLanguage;
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
                <Stack.Screen name="PanchaNivaranaScreen" component={PanchaNivaranaScreen}
                              options={{title: t('PanchaNivaranaScreen')}}/>
                <Stack.Screen name="SantaSukhaScreen" component={SantaSukhaScreen}
                              options={{title: t('SantaSukhaScreen')}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}