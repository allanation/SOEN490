import React from "react";
import { Image, View } from "react-native";

const AnimatedBg = () => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: null,
          height: null,
          zIndex: -1,
        }}
        source={{
          uri: "https://64.media.tumblr.com/a9d788a6532a99a289f0bcaae2a93ff3/ab05b19359d2ea30-35/s500x750/82ca6f2c820096e59bc650eee1e115e51be4feb9.gif",
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default AnimatedBg;
