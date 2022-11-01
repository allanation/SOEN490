import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function NavButton({ image, onPress}) {
    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}]} onPress={onPress}>
            <Ionicons name={image} size={30} color={'#32bca5'}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '0.8%',
        height: '77%',
    },
    text: {
        color: '#32bca5',
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        marginTop: '2%',
    }
});


export default NavButton;