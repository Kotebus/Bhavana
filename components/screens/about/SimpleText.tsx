import React, {PropsWithChildren} from "react";
import {Text} from "react-native";
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";

export interface ISimpleTextProps extends PropsWithChildren {
    isAlignedRight?: boolean;
}

export const SimpleText = ({children, isAlignedRight = false}: ISimpleTextProps) =>
    (
        <Text style={{
            fontSize: FONT_SIZE_DEFAULT,
            marginBottom: 15,
            textAlign: isAlignedRight ? 'right' : 'justify',
        }}>
            {children}
        </Text>
    );
