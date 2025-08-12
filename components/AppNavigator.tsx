import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import {ITime, Language} from "@/components/storage/storage";
import MeditationScreen from "@/components/screens/MeditationScreen";
import AboutScreen from "@/components/screens/AboutScreen";
import StudyScreen from "@/components/screens/StudyScreen";
import SermonScreen from "@/components/screens/SermonScreen";
import {SermonKey} from "@/components/i18n";
import HomeScreen from "@/components/screens/HomeScreen";

export interface IPropsWithLanguage {
    language: Language;
}

export interface ISermonProps {
    sermonKey: SermonKey;
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
    return (
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    contentStyle: {
                        backgroundColor: 'white',
                    },
                }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="MeditationScreen" component={MeditationScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AboutScreen" component={AboutScreen} options={{headerShown: false}}/>
                <Stack.Screen name="StudyScreen" component={StudyScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SermonScreen" component={SermonScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
    );
}