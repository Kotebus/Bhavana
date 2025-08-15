import React from 'react';
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {recitationsRoutingList} from "@/components/screens/materials/SermonsRoutingList";
import {ContentKey} from "../i18n";
import {RootStackParamList} from "@/components/AppNavigator";
import {MaterialsList} from "@/components/MaterialsList";

type Props = NativeStackScreenProps<RootStackParamList, 'RecitationsScreen'>;

export default function RecitationsScreen({ route, navigation } : Props) {
    const {language} = route.params;
    const navigate = (contentKey: ContentKey) =>
        navigation.navigate('SermonScreen', {contentKey: contentKey, language: language});

    return (
        <MaterialsList
            contentList={recitationsRoutingList}
            navigate={navigate}
        />
    );
}