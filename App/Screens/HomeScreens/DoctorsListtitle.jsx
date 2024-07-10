import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import { useNavigation } from "@react-navigation/native";

export default function DoctorsListtitle({ doctor }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.push("doctor-detail", {
          doctor: doctor,
        })
      }
    >
      <Image source={{ uri: doctor.images[0]?.url }} style={styles.image} />
      <View style={styles.infocontainer}>
        <Text style={{ fontSize: 17, fontFamily: "outfit-medium" }}>
          {doctor?.name}
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: "outfit-medium",
            color: Color.GRAY,
          }}
        >
          {doctor?.contactPerson}
        </Text>
        <Text
          style={{
            fontSize: 10,
            fontFamily: "outfit",
            padding: 3,
            color: Color.PRIMARY,
            backgroundColor: Color.PRIMARY_LIGHT,
            borderRadius: 3,
            alignSelf: "flex-start",
            paddingHorizontal: 7,
          }}
        >
          {doctor?.category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 10,
  },
  infocontainer: {
    padding: 7,
    display: "flex",
    gap: 3,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 10,
  },
});
