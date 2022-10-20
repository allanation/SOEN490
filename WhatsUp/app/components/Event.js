import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform, Image, View } from 'react-native';
import {useState} from 'react';
import BookmarkButton from "../components/BookmarkButton";
import Calendar from "../assets/Icons/icons8-calendar.png";
import Bookmark from "../assets/Icons/icons8-bookmark.png";

function Event({ image, title, organizer, date,  onPress}) {

    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}, {marginTop: 16}]} onPress={onPress}>
            <Image source={image} style={{position: 'absolute', left: 0}}/>
            <View style={{marginLeft: 30}}>
                <Text style={styles.text}>{title}</Text>
                <Text style={{fontSize: 12, color: '#969696'}}>By {organizer}</Text>
                <View style={{marginTop: 5, flexDirection: 'row'}}>
                    <Image source={Calendar} style={{height: 18, width: 18}}/>
                    <Text style={{fontSize: 11, color: '#100101', marginLeft: 3, marginTop: 1}}>{date}</Text>
                </View>
            </View>
            <BookmarkButton image={Bookmark}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 19,
        borderWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginVertical: 5,
        height: 81,
        width: '95%',
        shadowColor: '#100101', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android
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