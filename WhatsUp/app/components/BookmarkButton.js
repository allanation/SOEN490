import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import {useState} from 'react';

function BookmarkButton({ image, colour = '#32bca5'}) {
    const [Active, setActive] = useState(false);

    const handleClick = () => {

       setActive(current => !current);
       Active ? console.log("Event unBookmarked") : console.log("Event Bookmarked");
    };

    return (
        <TouchableOpacity style={[styles.button, {flexDirection:'row'}, {backgroundColor: Active ? '#32bca5' : '#FFFFFF',}]} onPress={handleClick}>
            <Image source={image} style={{height: 30, width: 30, top: 1}}/>
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