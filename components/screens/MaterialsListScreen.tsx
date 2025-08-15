import React from 'react';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {MaterialKey} from "../i18n";
import {RootStackParamList} from "@/components/AppNavigator";
import {MaterialsList} from "@/components/MaterialsList";

type Props = NativeStackScreenProps<RootStackParamList, 'MaterialsListScreen'>;

export default function MaterialsListScreen({ route, navigation } : Props) {
    const {language, materialsList} = route.params;
    const navigate = (materialKey: MaterialKey) => navigation.navigate('MaterialScreen', {materialKey, language});

    return (
        <MaterialsList
            contentList={materialsList}
            navigate={navigate}
        />
    );
}