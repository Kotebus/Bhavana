import React from "react";
import {ScrollView, Platform} from "react-native";
import {globalStyles} from "@/components/styles/global";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/AppNavigator";
import BackNavHeader from "@/components/BackNavHeader";
import {IUrlText, LinksList} from "@/components/LinksList";

type Props = NativeStackScreenProps<RootStackParamList, 'LinksListScreen'>;

const linksData: IUrlText[] = [
    {url: 'https://samatha-vipassana.com/', text: 'Chittaviveka monastery: samatha-vipassana.com'},
    {url: 'http://t.me/chittaviveka', text: 'Telegram: @chittaviveka'},
    {url: 'https://www.instagram.com/chittaviveka.monastery', text: 'Instagram: @chittaviveka'},
    {url: 'https://www.facebook.com/chittaviveka', text: 'Facebook: Chittaviveka Monastery'},
    {url: 'https://www.youtube.com/@ChittaViveka', text: 'Youtube Буддизм Тхеравада'},
    {url: 'https://vk.com/dhammatheravada', text: 'VK Dhamma Theravada'},
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