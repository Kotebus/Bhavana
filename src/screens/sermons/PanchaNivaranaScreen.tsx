import {ScrollView, StyleSheet} from "react-native";
import Markdown from "react-native-markdown-display";
import React from "react";
import {panchaNivaranaContent} from "./content/PanchaNivaranaContentRu";

export default function NivaranaScreen() {
    return (
        <ScrollView style={styles.container}>
            <Markdown
                style={{
                    body: {
                        fontSize: 16,
                    }}}
            >
                {panchaNivaranaContent}
            </Markdown>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});