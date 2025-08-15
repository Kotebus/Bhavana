import React from 'react';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {ContentKey} from "../i18n";
import {RootStackParamList} from "@/components/AppNavigator";
import {MaterialsList} from "@/components/MaterialsList";

type Props = NativeStackScreenProps<RootStackParamList, 'MaterialsListScreen'>;

export default function MaterialsListScreen({ route, navigation } : Props) {
    const {language, materialsList} = route.params;
    const navigate = (contentKey: ContentKey) => navigation.navigate('SermonScreen', {contentKey: contentKey, language: language});

    return (
        <MaterialsList
            contentList={materialsList}
            navigate={navigate}
        />
    );
}