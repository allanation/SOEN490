import React from 'react';
import { TextInput, View, StyleSheet, Image } from 'react-native';
import SearchIcon from "../assets/Icons/icons8-search-5.png"

function Search({ ...stuff }) {
    return (
        <View style={styles.container}>
        <Image source={SearchIcon} style={{width: 23, height: 23}}/>
        <TextInput style={styles.text} { ...stuff }/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        paddingVertical: 7,
        paddingHorizontal: 12,
        width: '85%',
        height: 36,
        marginVertical: 10,
        shadowColor: 'black',
        flexDirection: "row",
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'sans-serif',
        marginLeft: 5,
    },
});

export default Search;