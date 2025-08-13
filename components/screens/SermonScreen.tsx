import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View, Image} from "react-native";
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
    'Salayatana': [require('./sermons/content/SalayatanaRu.md'), require('./sermons/content/SalayatanaEn.md')],
    'Recitations': [require('./sermons/content/RecitationsRu.md'), require('./sermons/content/RecitationsEn.md')],
}

const imgSources: Record<string, any> = {
    'ayatana_scheme_mind_ru': require('./sermons/content/images/ayatana_scheme_mind_ru.png'),
    'ayatana_scheme_mind_en': require('./sermons/content/images/ayatana_scheme_mind_en.png'),
    'ayatana_scheme_ru': require('./sermons/content/images/ayatana_scheme_ru.jpg'),
    'ayatana_scheme_en': require('./sermons/content/images/ayatana_scheme_en.png'),
    'sri_bodhiraja_center': require('./sermons/content/images/sri_bodhiraja_center.jpg'),
    'vase_faces': require('./sermons/content/images/vase_faces.png'),
};

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
                rules={{
                    image: (node, children, parent, styles) => {
                        const src = node.attributes.src || '';
                        if (imgSources[src]) {
                            const imgSrc = imgSources[src];

                            //To render image on full page width and then height calculated base on that
                            const { width, height } = Image.resolveAssetSource(imgSrc);

                            return (
                                <Image
                                    key={src}
                                    source={imgSrc}
                                    style={{
                                        resizeMode: 'contain',
                                        flex: 1,
                                        aspectRatio: width / height
                                    }}
                                />
                            );
                        }
                        return (
                            <Image
                                key={src}
                                source={{ uri: src }}
                            />
                        );
                    },
                }}
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