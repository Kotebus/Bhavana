import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {ITime} from "../storage/storage";

interface Props {
    time: ITime
    language: 'ru' | 'en';
    onChange: (time: ITime) => void;
}

const TimePicker = ({ time, language, onChange } : Props) => {
    const l18n = language === 'ru' ?
        {h: 'ч', m: 'мин'} :
        {h: 'h', m: 'min'};

    const pickerStyle = Platform.OS === 'android' ? styles.pickerAndroid : undefined;

    return (
        <View style={styles.container}>
            <View style={styles.pickerWrap}>
                <Picker
                    selectedValue={time.hours}
                    onValueChange={(v) => onChange({...time, hours: v})}
                    style={pickerStyle}
                    itemStyle={styles.item}
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Picker.Item key={i} label={`${i} ${l18n.h}`} value={i} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.sep}>:</Text>

            <View style={styles.pickerWrap}>
                <Picker
                    selectedValue={time.minutes}
                    onValueChange={(v) => onChange({...time, minutes: v})}
                    style={pickerStyle}
                    itemStyle={styles.item}
                >
                    {Array.from({ length: 60 }).map((_, i) => (
                        <Picker.Item key={i} label={`${i} ${l18n.m}`} value={i} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    pickerWrap: { flex: 1 },
    sep: { fontSize: 28, marginHorizontal: 8 },
    item: { fontSize: 18 },
    pickerAndroid: { width: 140 },
});

export default TimePicker;
import React from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {ITime} from "../storage/storage";

interface Props {
    time: ITime
    language: 'ru' | 'en';
    onChange: (time: ITime) => void;
}

const TimePicker = ({ time, language, onChange } : Props) => {
    const l18n = language === 'ru' ?
        {h: 'ч', m: 'мин'} :
        {h: 'h', m: 'min'};

    const pickerStyle = Platform.OS === 'android' ? styles.pickerAndroid : undefined;

    return (
        <View style={styles.container}>
            <View style={styles.pickerWrap}>
                <Picker
                    selectedValue={time.hours}
                    onValueChange={(v) => onChange({...time, hours: v})}
                    style={pickerStyle}
                    itemStyle={styles.item}
                >
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Picker.Item key={i} label={`${i} ${l18n.h}`} value={i} />
                    ))}
                </Picker>
            </View>

            <Text style={styles.sep}>:</Text>

            <View style={styles.pickerWrap}>
                <Picker
                    selectedValue={time.minutes}
                    onValueChange={(v) => onChange({...time, minutes: v})}
                    style={pickerStyle}
                    itemStyle={styles.item}
                >
                    {Array.from({ length: 60 }).map((_, i) => (
                        <Picker.Item key={i} label={`${i} ${l18n.m}`} value={i} />
                    ))}
                </Picker>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    pickerWrap: { flex: 1 },
    sep: { fontSize: 28, marginHorizontal: 8 },
    item: { fontSize: 18 },
    pickerAndroid: { width: 140 },
});

export default TimePicker;