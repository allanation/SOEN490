import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function FilterButton({ image, onPress, title}) {
    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}]} onPress={onPress}>
            <Text>{title}</Text>
            <Ionicons name={image} size={30} color={'#32bca5'} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        height: '50%',
        width: '10%',
        marginTop: 13,
        marginLeft: 8,
    },
    text: {
        color: '#32bca5',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        marginTop: '2%',
    }
});


export default FilterButton;