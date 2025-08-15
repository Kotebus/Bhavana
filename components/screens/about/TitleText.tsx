import {PropsWithChildren} from "react";
import {FONT_SIZE_HEADER} from "@/components/styles/global";
import {Text} from "react-native";

export const TitleText = ({children}: PropsWithChildren) =>
    (
        <Text style={{
            paddingTop: 12,
            fontSize: FONT_SIZE_HEADER,
            fontWeight: 'bold',
            marginBottom: 15,
            alignSelf: 'flex-end'
        }}>
            {children}
        </Text>
    );