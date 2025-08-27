import React, {PropsWithChildren} from "react";
import {Text} from "react-native";
import {useSettings} from "@/components/contexts/SettingsContext";

export interface ISimpleTextProps extends PropsWithChildren {
    isAlignedRight?: boolean;
}

export const SimpleText = ({children, isAlignedRight = false}: ISimpleTextProps) => {
    const {settings} = useSettings();
    return (
        <Text
            selectable={true}
            style={{
                fontSize: settings.fontSize,
                padding: 1,
                marginBottom: 15,
                textAlign: isAlignedRight ? 'right' : 'justify',
            }}
        >
            {children}
        </Text>
    );
}
