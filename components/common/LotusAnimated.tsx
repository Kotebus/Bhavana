import React, {useRef} from "react";
import {Animated} from "react-native";
import {StyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";
import {ImageStyle} from "react-native/Libraries/StyleSheet/StyleSheetTypes";

export interface ILotusAnimatedProps {
    animationDuration: number;
    delayBeforeAnimation?: number;
    imageStyle?: StyleProp<ImageStyle>;
}

export const LotusAnimated = ({ animationDuration, imageStyle, delayBeforeAnimation = 500 }: ILotusAnimatedProps) => {
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
            source={require('../../assets/images/lotus.png')}
            resizeMode='contain'
            style={[imageStyle, {opacity: opacity.current}]}
        />
    );
}