import React from "react";
import {Platform} from "react-native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useTranslation} from "react-i18next";

import {ITime, Language} from "@/components/storage/storage";
import MeditationScreen from "@/components/screens/MeditationScreen";
import AboutScreen from "@/components/screens/about/AboutScreen";
import SermonScreen from "@/components/screens/SermonScreen";
import {ContentKey} from "@/components/i18n";
import HomeScreen from "@/components/screens/HomeScreen";
import SettingsScreen from "@/components/screens/SettingsScreen";
import LinksListScreen from "@/components/screens/about/LinksListScreen";
import {AboutMonasteryScreen} from "@/components/screens/about/AboutMonasteryScreen";
import {AboutTeacherScreen} from "@/components/screens/about/AboutTeacherScreen";
import {AboutSermonsScreen} from "@/components/screens/about/AboutSermonsScreen";
import AboutProjectScreen from "@/components/screens/AboutProjectScreen";
import MaterialsListScreen from "@/components/screens/MaterialsListScreen";
import {IContent} from "@/components/screens/materials/SermonsRoutingList";

export interface IPropsWithLanguage {
    language: Language;
}

export interface ISermonProps extends IPropsWithLanguage {
    contentKey: ContentKey;
}

export interface IMaterialsListProps extends IPropsWithLanguage {
    materialsList: IContent[];
}

export type RootStackParamList = {
    HomeScreen: undefined;
    MeditationScreen: ITime;
    AboutScreen: IPropsWithLanguage;
    SermonScreen: ISermonProps;
    SettingsScreen: IPropsWithLanguage;
    LinksListScreen: undefined;
    AboutMonasteryScreen: IPropsWithLanguage;
    AboutTeacherScreen: IPropsWithLanguage;
    AboutSermonsScreen: IPropsWithLanguage;
    AboutProjectScreen: IPropsWithLanguage;
    MaterialsListScreen: IMaterialsListProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
    const {t} = useTranslation();
    const isIos = Platform.OS === 'ios';
    return (
            <Stack.Navigator
                screenOptions={{
                    headerTitleAlign: 'center',
                    contentStyle: {
                        backgroundColor: 'white',
                    },
                }}>
                <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false, title: ''}}/>
                <Stack.Screen name="MeditationScreen" component={MeditationScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AboutScreen" component={AboutScreen} options={{headerShown: isIos, title: t('AboutScreen') }}/>
                <Stack.Screen name="MaterialsListScreen" component={MaterialsListScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SermonScreen" component={SermonScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{headerShown: false}}/>
                <Stack.Screen name="LinksListScreen" component={LinksListScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AboutProjectScreen" component={AboutProjectScreen} options={{headerShown: false}}/>
                <Stack.Screen name="AboutMonasteryScreen" component={AboutMonasteryScreen} options={{headerShown: isIos, title: t('AboutMonasteryScreen')}}/>
                <Stack.Screen name="AboutTeacherScreen" component={AboutTeacherScreen} options={{headerShown: isIos, title: t('AboutTeacherScreen')}}/>
                <Stack.Screen name="AboutSermonsScreen" component={AboutSermonsScreen} options={{headerShown: isIos, title: t('AboutSermonsScreen')}}/>
            </Stack.Navigator>
    );
}