import React from "react";
import {StyleSheet, Image } from "react-native";
import logo from "../assets/Logos/waves.png";
import { Dimensions } from 'react-native';

// eslint-disable-next-line no-empty-pattern
function BottomImg({ }) {

    return (
        <Image style={[styles.container, styles.imageContainer, styles.waves]} source={logo}/>
    );
}

const imageAspectRatio = (2481 / 1144);
const scaledWidth = Dimensions.get('window').width;
const scaledHeight = (scaledWidth / imageAspectRatio)/2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
    },
    waves: {
        width: scaledWidth,
        height: scaledHeight,
        position: 'absolute',
        bottom: 0,
        resizeMode: 'stretch'
    } 
});

export default BottomImg;