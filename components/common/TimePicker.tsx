import React from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {ITime} from "@/components/storage/storage";


interface ISinglePickerProps {
    value: number
    onChange: (val: number) => void;
    label: string;
    length: number;
}

const SinglePicker = ({value, onChange, length, label}: ISinglePickerProps) => {
    const isAndroid = Platform.OS === 'android';
    const pickerStyles =[styles.pickerCommon, isAndroid ? styles.pickerAndroid : undefined];

    return (
                <Picker
                    mode='dropdown'
                    dropdownIconColor={isAndroid ? 'white' : 'black'}
                    style={pickerStyles}
                    selectedValue={value}
                    onValueChange={onChange}
                    itemStyle={ isAndroid ? styles.item : undefined }
                >
                    {Array.from({ length: length }).map((_, i) => (
                        <Picker.Item key={i} label={`${i} ${label}`} value={i} />
                    ))}
                </Picker>
    );
}

interface ITimePickerProps {
    time: ITime
    language: 'ru' | 'en';
    onChange: (time: ITime) => void;
}

const TimePicker = ({ time, language, onChange } : ITimePickerProps) => {
    const [timeVal, setTimeVal] = React.useState(time);
    const l18n = language === 'ru' ?
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
                length={6}
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

const styles = StyleSheet.create({
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
        borderRadius: 8,
        backgroundColor: 'black',
        color: 'white',
    },

    pickerCommon: {
        flex: 1,
    },
    pickerAndroid: {
        backgroundColor: 'black',
        color:'white',
    },

    sepCommon: {
        fontSize: 20,
        paddingBottom: 6,
        position: 'absolute',
        marginLeft: -2
    },
    sepAndroid: {
        marginHorizontal: 8,
        color: 'white',
    },

    item: {
        backgroundColor: 'lightgray'
    },
});

export default TimePicker;