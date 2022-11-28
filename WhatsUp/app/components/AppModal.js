import React from 'react';
import { Modal, StyleSheet, View, Platform } from 'react-native';
import { BlurView } from "expo-blur";

function AppModal({ children, style, ...otherProps }) {
    return (
        <Modal {...otherProps}>
             <BlurView 
              style= {styles.blurBackground}
              intensity={10}
            >
            <View style={[styles.centeredView, style]}>
                {children}
            </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        ...Platform.select({
            ios:{
                flex: 0
            },
            android:{
                flex: 1
            }
        }),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,  
        resizeMode: "contain"
    },
    blurBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default AppModal;