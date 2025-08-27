import {PropsWithChildren} from "react";
import {Text} from "react-native";
import {useSettings} from "@/components/contexts/SettingsContext";

export interface ICitationTextProps extends PropsWithChildren {
    isAlignedRight?: boolean;
}
export const CitationText = ({children, isAlignedRight = false}: ICitationTextProps) => {
    const { settings} = useSettings();
    return (
        <Text
            selectable={true}
            style={{
                fontSize: settings.fontSize,
                flexShrink: 1,
                marginBottom: 15,
                fontWeight: 'bold',
                fontStyle: 'italic',
                textAlign: isAlignedRight ? 'right' : 'center',
            }}
        >
            {children}
        </Text>
    );
}