import {PropsWithChildren} from "react";
import {FONT_SIZE_HEADER} from "@/components/styles/global";
import {Text, TextStyle} from "react-native";

export interface ITitleTextProps extends PropsWithChildren {
    textAlign?: TextStyle["textAlign"];
}
export const TitleText = ({children, textAlign}: ITitleTextProps) =>
    (
        <Text style={{
            paddingTop: 12,
            fontSize: FONT_SIZE_HEADER,
            fontWeight: 'bold',
            marginBottom: 15,
            textAlign: textAlign ? textAlign : undefined,
        }}>
            {children}
        </Text>
    );