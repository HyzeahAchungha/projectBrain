import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function DoctorListItem({ doctor, booking }) {
  const navigate = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigate.push("doctor-detail", {
          doctor: doctor,
        })
      }
    >
      <Image source={{ uri: doctor?.images[0]?.url }} style={styles.image} />

      <View style={styles.subContainer}>
        <Text
          style={{
            fontFamily: "outfit",
            color: Color.LIGHT_GRAY,
            fontSize: 15,
          }}
        >
          <Ionicons
            name="location"
            size={20}
            color={Color.PRIMARY}
            style={{ marginRight: 10 }}
          />
          {doctor.contactPerson}
        </Text>
        <Text style={{ fontFamily: "outfit-bold", fontSize: 19 }}>
          {doctor.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            color: Color.LIGHT_GRAY,
            fontSize: 16,
          }}
        >
          {doctor.address}
        </Text>
        
        <Text
          style={[
            {
              padding: 5,
              borderRadius: 5,
              fontSize: 14,
              alignSelf: "flex-start",
            },
            booking?.bookingStatus == "Completed"
              ? { backgroundColor: Color.LIGHT_GREEN, color: Color.GREEN }
              : booking?.bookingStatus == "Cancel"
              ? { backgroundColor: Color.LIGHT_RED, color: Color.RED }
              : { color: Color.PRIMARY, backgroundColor: Color.PRIMARY_LIGHT },
          ]}
        >
          {booking?.bookingStatus}
        </Text>

        {booking?.id ? (
          <Text
            style={{ fontFamily: "outfit", color: Color.GRAY, fontSize: 16 }} >
              <FontAwesome name="calendar-o" size={24} color={Color.PRIMARY} />
            {/* icon */}{booking.date} at {booking.time}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Color.WHITE,
    borderRadius: 15,
    marginBottom: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  subContainer: {
    display: "flex",
    gap: 8,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
