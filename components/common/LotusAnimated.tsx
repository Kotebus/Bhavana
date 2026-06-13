import React, {useRef} from "react";
import {Animated} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ImageStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import {useSettings} from "@/components/contexts/SettingsContext";

export interface ILotusAnimatedProps {
    animationDuration: number;
    delayBeforeAnimation?: number;
    imageStyle?: StyleProp<ImageStyle>;
}

const LOTUS_LIGHT = require('../../assets/images/lotus.png');
const LOTUS_DARK = require('../../assets/images/lotus_dark.png');

export const LotusAnimated = ({ animationDuration, imageStyle, delayBeforeAnimation = 500 }: ILotusAnimatedProps) => {
    const {theme} = useSettings();
    const opacity = useRef(new Animated.Value(0));
    const onLoad = () => {
        Animated.timing(opacity.current, {
            toValue: 1,
            duration: animationDuration,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Animated.Image
            onLoad={() => setTimeout(onLoad, delayBeforeAnimation)}
            source={theme === 'dark' ? LOTUS_DARK : LOTUS_LIGHT}
            resizeMode='contain'
            style={[imageStyle, {opacity: opacity.current}]}
        />
    );
}
