import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform, Image, View } from 'react-native';
import colors from '../config/colors';

function Event({ image, title, organizer, onPress}) {
    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}, {marginTop: 20}]} onPress={onPress}>
            <Image source={image} style={{position: 'absolute', left: 0}}/>
            <View style={{marginLeft: 30}}>
                <Text style={styles.text}>{title}</Text>
                <Text style={{fontSize: 12, color: '#969696'}}>By {organizer}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 19,
        borderWidth: .25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginVertical: 5,
        height: 81,
        width: '95%',
    },
    text: {
        color: '#100101',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        marginTop: '2%',
    }
});


export default Event;