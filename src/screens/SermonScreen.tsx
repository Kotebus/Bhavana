import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet} from "react-native";
import Markdown from "react-native-markdown-display";
import {NativeStackScreenProps} from "@react-navigation/native-stack";

import {RootStackParamList} from "../components/AppNavigator";
import {loadMarkdownAsset} from "../services/MarkdownLoader";
import {SermonKey} from "../i18n";

type Props = NativeStackScreenProps<RootStackParamList, 'SermonScreen'>;

type SermonEntry = readonly [any, any];
type SermonsMap = {
    readonly [K in SermonKey]: SermonEntry;
};

const sermonsMap: SermonsMap = {
    'SantaSukha': [require('./sermons/content/SantaSukhaRu.md'), require('./sermons/content/SantaSukhaEn.md')],
    'PanchaNivarana': [require('./sermons/content/PanchaNivaranaRu.md'), require('./sermons/content/PanchaNivaranaEn.md')],
}

export default function SermonScreen({route}: Props) {
    const { sermonKey, language } = route.params;
    const [content, setContent] = useState<string | null>(null);


    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                const langRequireIndex = language === 'ru' ? 0 : 1;
                const asset = sermonsMap[sermonKey][langRequireIndex];
                const text = await loadMarkdownAsset(asset);
                setContent(text);
            } catch (error) {
                console.error('Ошибка загрузки markdown:', error);
            }
        };

        loadMarkdown();
    }, []);

    // useEffect(() => {
    //     const loadLecture = async () => {
    //         try {
    //             const map = language === 'ru' ? sermonsRu : sermonsEn;
    //             const module = await map[sermonKey]();
    //
    //             const text = Object.values(module)[0] as string;
    //             setContent(text);
    //         } catch (err) {
    //             console.error(`Ошибка загрузки лекции ${sermonKey}:`, err);
    //             setContent(`Лекция ${sermonKey} не найдена`);
    //         }
    //     };
    //
    //     loadLecture();
    // }, [sermonKey]);

    if (!content) {
        return (
            <ScrollView contentContainerStyle={styles.loader}>
                <ActivityIndicator size="large" />
            </ScrollView>
        );
    }
    return (
        <ScrollView style={styles.container}>
            <Markdown
                style={{
                    body: {
                        fontSize: 16,
                        textAlign: "justify",
                        padding: 5,
                    }}}
            >
                {content}
            </Markdown>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});