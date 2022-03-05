import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { themeColor } from '../utils/ThemeUtils';
import { Row } from './layout/Row';

interface PinPadProps {
    pin: boolean;
    shuffle?: boolean;
}

export default function PinPad({ pin, shuffle = false }: PinPadProps) {
    let pinNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const [value, setValue] = React.useState('');

    if (!pin) {
        setValue('0');
    }

    if (shuffle) {
        // shuffle the order of the numbers using schwartzian transform
        pinNumbers = pinNumbers
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    const appendValue = (newValue: string) => {
        if (!pin && value === '0') {
            setValue(newValue);
        } else {
            setValue(`${value}${newValue}`);
        }
    };

    const clearValue = () => {
        if (pin) {
            setValue('');
        } else {
            setValue('0');
        }
    };

    const deleteValue = () => {
        if (value.length === 1) {
            clearValue();
        } else {
            setValue(`${value.slice(0, value.length - 1)}`);
        }
    };

    const styles = StyleSheet.create({
        pinPadRow: {
            justifyContent: 'space-between',
            padding: 22,
            marginLeft: 30,
            marginRight: 30
        },
        pinPadNumber: {
            color: themeColor('text'),
            fontSize: 20,
            fontFamily: 'Lato-Bold'
        }
    });

    return (
        <View>
            <Row align="flex-end" style={styles.pinPadRow}>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[1])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[1]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[2])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[2]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[3])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[3]}</Text>
                </TouchableOpacity>
            </Row>
            <Row align="flex-end" style={styles.pinPadRow}>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[4])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[4]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[5])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[5]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[6])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[6]}</Text>
                </TouchableOpacity>
            </Row>
            <Row align="flex-end" style={styles.pinPadRow}>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[7])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[7]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[8])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[8]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[9])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[9]}</Text>
                </TouchableOpacity>
            </Row>
            <Row align="flex-end" style={styles.pinPadRow}>
                <TouchableOpacity onPress={() => clearValue()}>
                    <Text style={styles.pinPadNumber}>C</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => appendValue(pinNumbers[0])}>
                    <Text style={styles.pinPadNumber}>{pinNumbers[0]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteValue()}>
                    <Text style={styles.pinPadNumber}>{'<'}</Text>
                </TouchableOpacity>
            </Row>
        </View>
    );
}
