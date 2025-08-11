import React from "react";
import {ScrollView, StyleSheet} from "react-native";
import Markdown from "react-native-markdown-display";
import {panchaNivaranaContentRu} from "./content/PanchaNivaranaContentRu";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {panchaNivaranaContentEn} from "./content/PanchaNivaranaContentEn";
import {RootStackParamList} from "../../components/AppNavigator";

type Props = NativeStackScreenProps<RootStackParamList, 'PanchaNivaranaScreen'>;

export default function PanchaNivaranaScreen({route}: Props) {
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