import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import Markdown from "react-native-markdown-display";
import {panchaNivaranaContentRu} from "./content/PanchaNivaranaContentRu";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../../../App";
import {panchaNivaranaContentEn} from "./content/PanchaNivaranaContentEn";

type Props = NativeStackScreenProps<RootStackParamList, 'PanchaNivarana'>;

export default function PanchaNivaranaScreen({route}: Props) {
    const { language } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Markdown
                style={{
                    body: {
                        fontSize: 16,
                    }}}
            >
                {language === 'ru' ? panchaNivaranaContentRu : panchaNivaranaContentEn}
            </Markdown>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});