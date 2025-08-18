import React from "react";
import {ScrollView, Platform} from "react-native";
import {globalStyles} from "@/components/styles/global";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/common/AppNavigator";
import BackNavHeader from "@/components/common/BackNavHeader";
import {IUrlText, LinksList} from "@/components/common/LinksList";

type Props = NativeStackScreenProps<RootStackParamList, 'LinksListScreen'>;

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

export default function LinksListScreen({ navigation }: Props) {
    const isIos = Platform.OS === 'ios';
    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {isIos && <BackNavHeader onBack={() => navigation.goBack()}/>}
            <LinksList data={linksData}/>
        </ScrollView>
    );
}