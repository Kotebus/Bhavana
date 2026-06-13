import React, {useEffect, useState} from "react";
import {ActivityIndicator, ScrollView, StyleSheet, View, Image, Text, Platform} from "react-native";
import Markdown from "react-native-markdown-display";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import {MaterialKey} from "../i18n";
import {useSettings} from "../contexts/SettingsContext";
import {RootStackParamList} from "@/components/common/AppNavigator";
import {loadMarkdownAsset} from "@/components/services/MarkdownLoader";
import BackNavHeader from "@/components/common/BackNavHeader";
import TextSizeControl from "@/components/common/TextSizeControl";
import {SERMONS_MATERIALS_LIST} from "@/components/screens/materials/SermonsRoutingList";
import {useTranslation} from "react-i18next";
import {RU_LANGUAGE} from "@/components/constatnts";
import {useGlobalStyles, useThemePalette} from "@/components/styles/useThemedStyles";

type Props = NativeStackScreenProps<RootStackParamList, 'MaterialScreen'>;

type MaterialEntry = readonly [any, any];
type MaterialMap = {
    readonly [K in MaterialKey]: MaterialEntry;
};

const materialsListMap: MaterialMap = {
    'SantaSukha': [require('@/components/screens/materials/content/sermons/SantaSukhaRu.md'), require('@/components/screens/materials/content/sermons/SantaSukhaEn.md')],
    'PanchaNivarana': [require('@/components/screens/materials/content/sermons/PanchaNivaranaRu.md'), require('@/components/screens/materials/content/sermons/PanchaNivaranaEn.md')],
    'DanaSilaBhavana': [require('@/components/screens/materials/content/sermons/DanaSilaBhavanaRu.md'), require('@/components/screens/materials/content/sermons/DanaSilaBhavanaEn.md')],
    'Salayatana': [require('@/components/screens/materials/content/sermons/SalayatanaRu.md'), require('@/components/screens/materials/content/sermons/SalayatanaEn.md')],
    'Viveka': [require('@/components/screens/materials/content/sermons/VivekaRu.md'), require('@/components/screens/materials/content/sermons/VivekaEn.md')],
    'Sankhara': [require('@/components/screens/materials/content/sermons/SankharaRu.md'), require('@/components/screens/materials/content/sermons/SankharaEn.md')],
    'PanchaKkhandha': [require('@/components/screens/materials/content/sermons/PanchaKkhandhaRu.md'), require('@/components/screens/materials/content/sermons/PanchaKkhandhaEn.md')],
    'Anicca': [require('@/components/screens/materials/content/sermons/AniccaRu.md'), require('@/components/screens/materials/content/sermons/AniccaEn.md')],
    'YonisoManasikara': [require('@/components/screens/materials/content/sermons/YonisoManasikaraRu.md'), require('@/components/screens/materials/content/sermons/YonisoManasikaraEn.md')],
    'Vipassanupakkilesa': [require('@/components/screens/materials/content/sermons/VipassanupakkilesaRu.md'), require('@/components/screens/materials/content/sermons/VipassanupakkilesaEn.md')],
    'Sankharaloka': [require('@/components/screens/materials/content/sermons/SankharaLokaRu.md'), require('@/components/screens/materials/content/sermons/SankharaLokaEn.md')],
    'Vedananupassana': [require('@/components/screens/materials/content/sermons/VedananupassanaRu.md'), require('@/components/screens/materials/content/sermons/VedananupassanaEn.md')],
    'Kama': [require('@/components/screens/materials/content/sermons/KamaRu.md'), require('@/components/screens/materials/content/sermons/KamaEn.md')],
    'Dhatu18': [require('@/components/screens/materials/content/sermons/Dhatu18Ru.md'), require('@/components/screens/materials/content/sermons/Dhatu18En.md')],
    'Upasamanussati': [require('@/components/screens/materials/content/sermons/UpasamanussatiRu.md'), require('@/components/screens/materials/content/sermons/UpasamanussatiEn.md')],
    'SankappaRago': [require('@/components/screens/materials/content/sermons/SankappaRagoRu.md'), require('@/components/screens/materials/content/sermons/SankappaRagoEn.md')],
    'AllRecitations': [require('@/components/screens/materials/content/recitations/RecitationsRu.md'), require('@/components/screens/materials/content/recitations/RecitationsEn.md')],
    'Namaskaras': [require('@/components/screens/materials/content/recitations/NamaskarasRu.md'), require('@/components/screens/materials/content/recitations/NamaskarasEn.md')],
    'Qualities': [require('@/components/screens/materials/content/recitations/ThreeJevelsQualitiesRu.md'), require('@/components/screens/materials/content/recitations/ThreeJevelsQualitiesEn.md')],
    'Veneration': [require('@/components/screens/materials/content/recitations/RelictsAndBodhiThreeVenerationRu.md'), require('@/components/screens/materials/content/recitations/RelictsAndBodhiThreeVenerationEn.md')],
    'Confession': [require('@/components/screens/materials/content/recitations/ConfessionOfFaultsRu.md'), require('@/components/screens/materials/content/recitations/ConfessionOfFaultsEn.md')],
    'Offering': [require('@/components/screens/materials/content/recitations/PracticeOfferingRu.md'), require('@/components/screens/materials/content/recitations/PracticeOfferingEn.md')],
}

const imgSources: Record<string, any> = {
    'ayatana_scheme_mind_ru': require('@/components/screens/materials/content/images/ayatana_scheme_mind_ru.png'),
    'ayatana_scheme_mind_en': require('@/components/screens/materials/content/images/ayatana_scheme_mind_en.png'),
    'ayatana_scheme_ru': require('@/components/screens/materials/content/images/ayatana_scheme_ru.jpg'),
    'ayatana_scheme_en': require('@/components/screens/materials/content/images/ayatana_scheme_en.png'),
    'sri_bodhiraja_center': require('@/components/screens/materials/content/images/sri_bodhiraja_center.jpg'),
    'vase_faces': require('@/components/screens/materials/content/images/vase_faces.png'),
    'Tapchan_the_cat_my_friend': require('@/components/screens/materials/content/images/Tapchan_the_cat_best_friend.png'),
};

export default function MaterialScreen({route, navigation}: Props) {
    const {materialKey, language} = route.params;
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();
    const palette = useThemePalette();
    const [content, setContent] = useState<string | null>(null);
    const {settings} = useSettings();
    const [textSize, setTextSize] = useState(settings.fontSize);

    useEffect(() => {
        const loadMarkdown = async () => {
            try {
                const langRequireIndex = language === RU_LANGUAGE ? 0 : 1;
                const asset = materialsListMap[materialKey][langRequireIndex];
                const text = await loadMarkdownAsset(asset);
                setContent(text);
            } catch (error) {
                console.error('Markdown loading error:', error);
            }
        };

        void loadMarkdown();
    }, [language, materialKey]);

    if (!content) {
        return (
            <ScrollView contentContainerStyle={styles.loader}>
                <ActivityIndicator size="large"/>
            </ScrollView>
        );
    }

    //If it's a sermon of Venerable Rakwane Gnanaseeha we will show his name at the top.
    const isSermon = SERMONS_MATERIALS_LIST.includes(materialKey);
    const isIos = Platform.OS === 'ios';
    const containerStyles = [
        globalStyles.scrollContainer,
        isIos ? globalStyles.scrollContainerIos : undefined];

    return (
        <ScrollView style={containerStyles}>
            <BackNavHeader onBack={() => navigation.goBack()}>
                <TextSizeControl onChange={setTextSize}/>
            </BackNavHeader>
            {isSermon &&
                <Text style={{
                    alignSelf: 'flex-end',
                    fontSize: textSize,
                    color: palette.text,
                }}>
                    {t('TeacherName')}
                </Text>
            }
                <Markdown
                    style={{
                        body: {
                            fontSize: textSize,
                            textAlign: "justify",
                            padding: 3,
                            color: palette.markdownText,
                        },
                        heading1: {color: palette.markdownHeading},
                        heading2: {color: palette.markdownHeading},
                        heading3: {color: palette.markdownHeading},
                        heading4: {color: palette.markdownHeading},
                        heading5: {color: palette.markdownHeading},
                        heading6: {color: palette.markdownHeading},
                        hr: {backgroundColor: palette.border},
                        blockquote: {
                            backgroundColor: palette.surface,
                            borderLeftColor: palette.border,
                        },
                        code_inline: {
                            backgroundColor: palette.controlBg,
                            color: palette.controlText,
                        },
                        code_block: {
                            backgroundColor: palette.controlBg,
                            color: palette.controlText,
                        },
                        fence: {
                            backgroundColor: palette.controlBg,
                            color: palette.controlText,
                        },
                    }}
                    rules={{
                        //FIX for MD renderer: without it sometimes the end of a paragraph gets cut off.
                        text: (node) => (
                            <Text selectable={true} key={node.key} style={[{fontSize: textSize, flexShrink: 1, color: palette.markdownText}]}>
                                {node.content}
                            </Text>
                        ),
                        textgroup: (node, children, styles) => (
                            <Text key={node.key} style={[styles.textgroup, {width: '95%'}]}>
                                {children}
                            </Text>
                        ),
                        //End if FIX
                        image: (node) => {
                            const src = node.attributes.src || '';
                            if (imgSources[src]) {
                                const imgSrc = imgSources[src];

                                //To render image on full page width and then height calculated base on that
                                const {width, height} = Image.resolveAssetSource(imgSrc);

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
                                    source={{uri: src}}
                                />
                            );
                        },
                    }}
                >
                    {content}
                </Markdown>
            <View style={styles.icon}>
                <FontAwesome6 name="dharmachakra" size={24} color={palette.icon}/>
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