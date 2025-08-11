import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import Markdown from "react-native-markdown-display";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

import {santaSukhaContentRu} from "./content/SantaSukhaContentRu";
import {santaSukhaContentEn} from "./content/SantaSukhaContentEn";
import {RootStackParamList} from "../../components/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'SantaSukhaScreen'>;

export default function SantaSukhaScreen({route}: Props) {
    const { language } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Markdown
                style={{
                    body: {
                        fontSize: 16,
                        textAlign: "justify",
                    }}}
            >
                {language === 'ru' ? santaSukhaContentRu : santaSukhaContentEn}
            </Markdown>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});