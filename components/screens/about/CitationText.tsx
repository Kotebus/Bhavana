import {PropsWithChildren} from "react";
import {FONT_SIZE_DEFAULT} from "@/components/styles/global";
import {Text} from "react-native";

export interface ICitationTextProps extends PropsWithChildren {
    isAlignedRight?: boolean;
}
export const CitationText = ({children, isAlignedRight = false}: ICitationTextProps) =>
    (
        <Text style={{
            fontSize: FONT_SIZE_DEFAULT,
            marginBottom: 15,
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign: isAlignedRight ? 'right' : 'center',
        }}>
            {children}
        </Text>
    );