import React from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ITime, Language} from "@/components/storage/storage";
import {RU_LANGUAGE} from "@/components/constatnts";
import {useThemePalette} from '@/components/styles/useThemedStyles';
import {ThemePalette} from '@/components/styles/theme';


interface ISinglePickerProps {
    value: number
    onChange: (val: number) => void;
    label: string;
    length: number;
}

const SinglePicker = ({value, onChange, length, label}: ISinglePickerProps) => {
    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);
    const isAndroid = Platform.OS === 'android';
    const pickerStyles =[styles.pickerCommon, isAndroid ? styles.pickerAndroid : undefined];

    return (
                <Picker
                    mode='dropdown'
                    dropdownIconColor={palette.icon}
                    style={pickerStyles}
                    selectedValue={value}
                    onValueChange={onChange}
                    itemStyle={isAndroid ? styles.itemAndroid : styles.itemIos}
                >
                    {Array.from({ length: length }).map((_, i) => (
                        <Picker.Item key={i} label={`${i} ${label}`} value={i} />
                    ))}
                </Picker>
    );
}

interface ITimePickerProps {
    time: ITime
    language: Language;
    onChange: (time: ITime) => void;
}

const TimePicker = ({ time, language, onChange } : ITimePickerProps) => {
    const palette = useThemePalette();
    const styles = React.useMemo(() => makeStyles(palette), [palette]);
    const [timeVal, setTimeVal] = React.useState(time);
    const l18n = language === RU_LANGUAGE ?
        {h: 'ч', m: 'мин'} :
        {h: 'h', m: 'min'};

    const updateTime = (newTime: ITime) => {
        onChange(newTime);
        setTimeVal(newTime);
    }

    const isAndroid = Platform.OS === 'android';
    const containerStyles =[styles.containerCommon, isAndroid ? styles.containerAndroid : undefined];
    const separatorStyles = [styles.sepCommon, isAndroid ? styles.sepAndroid : undefined];

    return (
        <View style={containerStyles}>
            <SinglePicker
                value={timeVal.h}
                onChange={(v) => updateTime({...time, h: v})}
                label={l18n.h}
                length={3}
            />

            <Text style={separatorStyles}>:</Text>

            <SinglePicker
                value={timeVal.m}
                onChange={(v) => updateTime({...time, m: v})}
                label={l18n.m}
                length={60}
            />
        </View>
    );
};

const makeStyles = (p: ThemePalette) => StyleSheet.create({
    containerCommon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        alignSelf: 'center',
    },
    containerAndroid: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: p.pickerBorder,
        borderRadius: 8,
        backgroundColor: p.surface,
        color: p.text,
        overflow: 'hidden',
    },

    pickerCommon: {
        flex: 1,
    },
    pickerAndroid: {
        backgroundColor: p.surface,
        color: p.text,
    },

    sepCommon: {
        fontSize: 20,
        paddingBottom: 6,
        position: 'absolute',
        marginLeft: -2,
        color: p.text,
    },
    sepAndroid: {
        marginHorizontal: 8,
    },

    itemAndroid: {
        color: p.text,
        backgroundColor: p.controlBg,
    },
    itemIos: {
        color: p.text,
    },
});

export default TimePicker;
