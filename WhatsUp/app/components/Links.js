import React from 'react';
import { Text, TouchableWithoutFeedback, View, StyleSheet} from 'react-native';
import colors from '../config/colors';

function Links({ link, onPress, style}) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={style}>
                <Text style={styles.text}>
                    {link}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

export default Links;

const styles = StyleSheet.create({
    text: {
        color: colors.primary,
        fontWeight: '600', 
    },
});