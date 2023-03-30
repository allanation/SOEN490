/* eslint-disable react/prop-types */
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";

UtilBtn.defaultProps = {
  title: "",
};

function UtilBtn({
  title,
  onPress,
  color = "primary",
  style,
  icon,
  iconSize = 40,
  testID
}) {
  return (
    <TouchableOpacity
      style={[
        {
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 0.2, // IOS
          shadowRadius: 3, //IOS
          elevation: 2, // Android
        },
        style,
      ]}
      title={title}
      onPress={onPress}
    > 
    <View style={{ flexDirection: 'row' }}>
      <Ionicons testID= {testID} name={icon} size={iconSize} color={colors[color]} />
      <Text style={{ marginLeft: 2 }}>{title}</Text>
    </View>
    </TouchableOpacity>
  );
}

export default UtilBtn;
