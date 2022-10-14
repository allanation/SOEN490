import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import colors from '../config/colors';

function NavButton({ image, position, onPress}) {
    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}, {left: position}]} onPress={onPress}>
            <Image source={image}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginVertical: 5,
        height: 33,
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