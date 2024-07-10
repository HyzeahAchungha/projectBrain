import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation} from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";


export default function PageHeading({title}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
        <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
          {title}
        </Text>
      </TouchableOpacity>
  )
}