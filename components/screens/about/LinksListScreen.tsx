import React from "react";
import {ScrollView, Platform} from "react-native";
import {router} from "expo-router";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";
import BackNavHeader from "@/components/common/BackNavHeader";
import {IUrlText, LinksList} from "@/components/common/LinksList";

const linksData: IUrlText[] = [
    {url: 'https://samatha-vipassana.com/', text: 'Chittaviveka monastery: samatha-vipassana.com'},
    {
        deepLink: 'tg://resolve?domain=chittaviveka',
        url: 'https://t.me/chittaviveka',
        text: 'Telegram: @chittaviveka'
    },
    {
        deepLink: 'instagram://user?username=chittaviveka.monastery',
        url: 'https://www.instagram.com/chittaviveka.monastery',
        text: 'Instagram: @chittaviveka'
    },
    {
        deepLink: 'fb://group/681740985957543',
        url: 'https://www.facebook.com/chittaviveka',
        text: 'Facebook: Chittaviveka Monastery'
    },
    {
        deepLink: 'vnd.youtube://www.youtube.com/@ChittaViveka',
        url: 'https://www.youtube.com/@ChittaViveka',
        text: 'Youtube Буддизм Тхеравада'
    },
    {
        deepLink: 'vk://vk.com/dhammatheravada',
        url: 'https://vk.com/dhammatheravada',
        text: 'VK Dhamma Theravada'
    },
    {url: 'https://theravada.ru/', text: 'theravada.ru'},
];

export default function LinksListScreen() {
    const isIos = Platform.OS === 'ios';
    const globalStyles = useGlobalStyles();
    return (
        <ScrollView contentContainerStyle={[globalStyles.scrollContainer, {paddingVertical: 40}]}>
            {isIos && <BackNavHeader onBack={() => router.back()}/>}
            <LinksList data={linksData}/>
        </ScrollView>
    );
}