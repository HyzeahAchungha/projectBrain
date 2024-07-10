import { View, Text, Image, StyleSheet, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import Color from "../../Utils/Color";
import DoctorsPhotos from "./DoctorsPhotos";
import { Ionicons } from "@expo/vector-icons";
import BookingModal from "./BookingModal";
import DoctorAboutScreen from "./DoctorAboutScreen";

export default function DoctorDetailsScreen() {
  const param = useRoute().params;
  const [doctor, setDoctor] = useState(param.doctor);
  const navigate = useNavigation();

  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {}, []);

  return (
    doctor && (
      <View>
        <ScrollView style={{ height: "91%" }}>
          <TouchableOpacity
            style={styles.backBtnContainer}
            onPress={() => navigate.goBack()}
          >
            <AntDesign name="arrowleft" size={30} color="white" />
          </TouchableOpacity>

          <Image
            source={{ uri: doctor?.images[0]?.url }}
            style={{ width: "100%", height: 300 }}
          />

          <View style={styles.infoContainer}>

            <Text style={{ fontFamily: "outfit-bold", fontsize: 25 }}>
              {doctor?.name}
            </Text>

            <View style={styles.subContainer}>
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  color: Color.PRIMARY,
                  fontSize: 20,
                }}
              >
                {doctor?.contactPerson} ✨
              </Text>
              <Text
                style={{
                  color: Color.PRIMARY,
                  backgroundColor: Color.PRIMARY_LIGHT,
                  padding: 2,
                  fontSize: 14,
                }}
              >
                {doctor?.category.name}
              </Text>
            </View>

            <Text
              style={{ fontSize: 17, fontFamily: "outfit", color: Color.GRAY }}
            >
              <Ionicons name="location" size={25} color={Color.PRIMARY} />
              {doctor?.address}
            </Text>
            
            {/* horizontal line */}
            <View
              style={{
                borderWidth: 0.4,
                borderColor: Color.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>
            {/* 

          About me section */}
            <DoctorAboutScreen doctor={doctor} />

            {/* horizontal line */}

            <View
              style={{
                borderWidth: 0.4,
                borderColor: Color.GRAY,
                marginTop: 20,
                marginBottom: 20,
              }}
            ></View>

            <DoctorsPhotos doctor={doctor} />

          </View>
        </ScrollView>

        <View
          style={{ display: "flex", flexDirection: "row", margin: 8, gap: 8 }}
        >
          <TouchableOpacity style={styles.messageBtn}
            onPress={() => navigation.push("chats")}>
            <Text
              style={{
                alignItems: "center",
                fontFamily: "outfit-medium",
                color: Color.PRIMARY,
                fontSize: 18,
              }}
            >
              Message
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bookingBtn}
            onPress={() => setShowModal(true)}
          >
            <Text
              style={{
                alignItems: "center",
                fontFamily: "outfit-medium",
                color: Color.WHITE,
                fontSize: 18,
              }}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>

        {/* Booking Screen Modal */}
        <Modal animationType="slide" visible={showModal}>
          <BookingModal
          businessId={doctor.id}
           hideModal={()=>setShowModal(false)} />
        </Modal>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  backBtnContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 20,
  },
  infoContainer: {
    padding: 20,
    display: "flex",
    gap: 7,
  },
  subContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  messageBtn: {
    padding: 15,
    backgroundColor:Color.WHITE,
    borderWidth: 1,
    borderColor:Color.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
  bookingBtn: {
    padding: 15,
    backgroundColor: Color.PRIMARY,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 99,
    flex: 1,
  },
});
