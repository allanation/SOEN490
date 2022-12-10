/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import { Ionicons } from '@expo/vector-icons';

function BookmarkButton({colour = '#32bca5'}) {
    const [Active, setActive] = useState(false);

    const handlePress = () => {
       setActive(current => !current);
       Active ? console.log("Event unBookmarked") : console.log("Event Bookmarked");
    };

    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}]} onPress={handlePress}>
            <Ionicons name={Active ? 'ios-bookmark' : 'ios-bookmark-outline'} size={30} color={'#32bca5'} style={{height: 30, width: 30, top: '1%'}}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        marginVertical: 5,
        height: 20,
        width: 16,
        marginTop: 13,
        marginLeft: 8,
        position: 'absolute',
        right: 20,
        top: 5,
    },
});


export default BookmarkButton;