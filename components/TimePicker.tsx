import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {ITime} from "@/components/storage/storage";


interface ISinglePickerProps {
    value: number
    onChange: (val: number) => void;
    label: string;
    length: number;
}

const SinglePicker = ({value, onChange, length, label}: ISinglePickerProps) => {
    return (
                <Picker
                    mode='dropdown'
                    dropdownIconColor={'white'}
                    style={styles.picker}
                    selectedValue={value}
                    onValueChange={onChange}
                    itemStyle={styles.item}
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

    return (
        <View style={styles.container}>
            <SinglePicker
                value={timeVal.h}
                onChange={(v) => updateTime({...time, h: v})}
                label={l18n.h}
                length={6}
            />

            <Text style={styles.sep}>:</Text>

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
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 8,
        width: '90%',
        alignSelf: 'center',
        backgroundColor: 'black',
        color: 'white',
        paddingHorizontal:7,
    },
    picker: {
        backgroundColor: 'black',
        color:'white',
        flex: 1,
    },
    sep: { fontSize: 28, marginHorizontal: 8, paddingBottom: 6, color: 'white' },
    item: { backgroundColor: 'lightgray' },
});

export default TimePicker;