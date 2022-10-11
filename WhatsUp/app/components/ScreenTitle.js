import React from 'react';
import { Text, StyleSheet } from 'react-native';

function ScreenTitle({title}) {
    return (
        <Text style={styles.text}>{title}</Text>
    );
}

export default ScreenTitle;

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        fontWeight: 'bold',
    }
});