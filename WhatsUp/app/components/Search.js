import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function Search({ ...stuff }) {
    return (
        <View style={styles.container}>
        <Ionicons name='ios-search-outline' size={24} color={'#969696'} style={{width: 23, height: 23}}/>
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
        alignItem: 'center',
        top: '1%',
    },
});

export default Search;