import React from 'react';
import {router, useLocalSearchParams} from 'expo-router';
import {MaterialKey} from "../i18n";
import {MaterialsList} from "@/components/common/MaterialsList";
import {recitationsRoutingList, sermonsRoutingList} from "@/components/screens/materials/SermonsRoutingList";

export default function MaterialsListScreen() {
    const {type} = useLocalSearchParams<{type?: 'sermons' | 'recitations'}>();
    const materialsList = type === 'recitations' ? recitationsRoutingList : sermonsRoutingList;
    const navigate = (materialKey: MaterialKey) => router.navigate(`/material/${materialKey}`);

    return (
        <MaterialsList
            contentList={materialsList}
            navigate={navigate}
        />
    );
}
