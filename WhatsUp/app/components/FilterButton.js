import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';

function FilterButton({ image, onPress}) {
    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}]} onPress={onPress}>
            <Image source={image}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginVertical: 5,
        height: 28,
        width: 28,
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