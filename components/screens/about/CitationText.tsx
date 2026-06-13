import {PropsWithChildren} from "react";
import {Text} from "react-native";
import {useSettings} from "@/components/contexts/SettingsContext";
import {useThemePalette} from "@/components/styles/useThemedStyles";

export interface ICitationTextProps extends PropsWithChildren {
    isAlignedRight?: boolean;
}
export const CitationText = ({children, isAlignedRight = false}: ICitationTextProps) => {
    const { settings} = useSettings();
    const palette = useThemePalette();
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
                color: palette.text,
            }}
        >
            {children}
        </Text>
    );
}