import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View} from "react-native";
import Markdown from "react-native-markdown-display";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import {SermonKey} from "../i18n";
import {useSettings} from "../contexts/SettingsContext";
import {RootStackParamList} from "@/components/AppNavigator";
import {loadMarkdownAsset} from "@/components/services/MarkdownLoader";
import BackNavHeader from "@/components/BackNavHeader";
import TextSizeControl from "@/components/TextSizeControl";
import {globalStyles} from "@/components/styles/global";

type Props = NativeStackScreenProps<RootStackParamList, 'SermonScreen'>;

type SermonEntry = readonly [any, any];
type SermonsMap = {
    readonly [K in SermonKey]: SermonEntry;
};

const sermonsMap: SermonsMap = {
    'SantaSukha': [require('./sermons/content/SantaSukhaRu.md'), require('./sermons/content/SantaSukhaEn.md')],
    'PanchaNivarana': [require('./sermons/content/PanchaNivaranaRu.md'), require('./sermons/content/PanchaNivaranaEn.md')],
    'DanaSilaBhavana': [require('./sermons/content/DanaSilaBhavanaRu.md'), require('./sermons/content/DanaSilaBhavanaEn.md')],
    'Recitations': [require('./sermons/content/RecitationsRu.md'), require('./sermons/content/RecitationsEn.md')],
}

export default function SermonScreen({route, navigation}: Props) {
    const { sermonKey, language } = route.params;
    const [content, setContent] = useState<string | null>(null);
    const {settings} = useSettings();
    const [textSize, setTextSize] = useState(settings.fontSize);

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
    }, [language, sermonKey]);

    if (!content) {
        return (
            <ScrollView contentContainerStyle={styles.loader}>
                <ActivityIndicator size="large" />
            </ScrollView>
        );
    }

    return (
        <ScrollView style={globalStyles.commonContainer}>
            <BackNavHeader onBack={() => navigation.goBack()}>
                <TextSizeControl onChange={setTextSize} />
            </BackNavHeader>
                <Markdown
                style={{
                    body: {
                        fontSize: textSize,
                        textAlign: "justify",
                        padding: 3,
                    }}}
            >
                {content}
            </Markdown>
            <View style={styles.icon}>
                <FontAwesome6 name="dharmachakra" size={24} color="black" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        alignSelf: "center",
        paddingTop: 5,
        paddingBottom: 30,
    },
});