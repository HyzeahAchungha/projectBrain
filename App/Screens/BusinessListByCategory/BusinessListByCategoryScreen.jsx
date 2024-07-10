import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native-gesture-handler";
import GlobalApi from "../../Utils/GlobalApi";
import DoctorListItem from "./DoctorListItem";
import Color from "../../Utils/Color";
export default function BusinessListByCategoryScreen() {
  const param = useRoute().params;
  const navigation = useNavigation();
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    param && getBusinessByCategory();
  }, [param]);

  // DoctorListByCategory

  const getBusinessByCategory = () => {
    GlobalApi.getBusinessListByCategory(param.category).then((resp) => {
      setDoctorList(resp.businessLists);
    });
  };

  return (
    <View style={{ padding: 20, paddingTop: 30 }}>
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
          {param?.category}
        </Text>
      </TouchableOpacity>

      {doctorList?.length > 0 ? (
        <FlatList
          data={doctorList}
          style={{ marginTop: 15 }}
          renderItem={({ item, index }) => <DoctorListItem doctor={item} />}
        />
      ) : (
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 20,
            textAlign: "center",
            marginTop: "20%",
            color: Color.GRAY,
          }}
        >
          No Doctor Found
        </Text>
      )}
    </View>
  );
}
