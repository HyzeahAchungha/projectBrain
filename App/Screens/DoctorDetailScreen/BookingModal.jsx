import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageHeading from "../../Component/PageHeading";
import AntDesign from "@expo/vector-icons/AntDesign";
import CalendarPicker from "react-native-calendar-picker";
import Color from "../../Utils/Color";
import Heading from "../../Component/Heading";
import { FlatList } from "react-native";
import GlobalApi from "../../Utils/GlobalApi";
import { useUser } from "@clerk/clerk-expo";
import moment from "moment";

export default function BookingModal({ businessId, hideModal }) {
  const [timeLists, setTimeList] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [note, setNote] = useState();
  const { user } = useUser();
  
  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 8; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });

      timeList.push({
        time: i + ":30 AM",
      });
    }

    for (let i = 1; i <= 7; i++) {
      timeList.push({
        time: i + ":00 PM",
      });

      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeList(timeList);
  };
  // create Booking Method
  const createNewBooking = () => {
    if (!selectedTime || !selectedDate) {
  ToastAndroid.show("Please select Date and Time!", ToastAndroid.LONG);
    }

    // API call to create booking
    const data = {
      userName: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      time: selectedTime,
      date:  moment(selectedDate).format('DD-MMM-YYY'),
      note: note,
      businessId: businessId,
    };

    GlobalApi.createBooking(data).then((resp) => {
      // success case
      console.log("Booking created successfully", resp);
      ToastAndroid.show("Booking created successfully!", ToastAndroid.LONG);
      hideModal();
    });
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView style={{ padding: 20 }}>
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => hideModal()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
          <Text style={{ fontSize: 25, fontFamily: "outfit-medium" }}>
            Booking
          </Text>
        </TouchableOpacity>

        {/* calender section */}
        <Heading text={"Selected Date"} />
        <View style={styles.calenderContainer}>
          <CalendarPicker
            onDateChange={setSelectedDate}
            width={340}
            minDate={Date.now()}
            todayBackgroundColor={Color.BLACK}
            todayTextStyle={{ color: Color.WHITE }}
            selectedDayColor={Color.PRIMARY}
            selectedDayTextColor={Color.WHITE}
          />
        </View>
        {/* sellected Time section  */}
        <View style={{ marginTop: 3 }}>
          <Heading text={"Select Time Slot"} />
          <FlatList
            data={timeLists}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => setSelectedTime(item.time)}
              >
                <Text
                  style={[
                    selectedTime == item.time
                      ? styles.selectedTime
                      : styles.unSelectedTime,
                  ]}
                >
                  {item.time}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Note Section  */}
        <View style={{ paddingTop: 20 }}>
          <Heading text={"Any Suggestion Note"} />
          <TextInput
            placeholder="Note"
            style={styles.noteTextArea}
            numberOfLines={4}
            multiline={true}
            onChange={(text) => setNote(text)}
          />
        </View>

        {/* Confirmation Button  */}
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() => createNewBooking()}
        >
          <Text style={styles.confirmBtn}>Confirm & Book</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  calenderContainer: {
    backgroundColor: Color.PRIMARY_LIGHT,
    padding: 20,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
  },
  selectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 18,
    backgroundColor: Color.PRIMARY,
    color: Color.WHITE,
  },
  unSelectedTime: {
    padding: 10,
    borderWidth: 1,
    borderColor: Color.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 18,
    color: Color.PRIMARY,
  },
  noteTextArea: {
    borderWidth: 1,
    borderRadius: 15,
    textAlignVertical: "top",
    padding: 20,
    fontSize: 16,
    fontFamily: "outfit",
    borderColor: Color.PRIMARY,
  },
  confirmBtn: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 17,
    backgroundColor: Color.PRIMARY,
    padding: 13,
    borderRadius: 99,
    color: Color.WHITE,
    elevation: 2,
  },
});
