import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Heading from "../../Component/Heading";
import GlobalApi from "../../Utils/GlobalApi";
import DoctorsListtitle from "./DoctorsListtitle";

export default function BusinessList() {
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    getBusinessList();
  }, []);

  // Get BusinessList from ApI

  const getBusinessList = () => {
    GlobalApi.getBusinessList().then((resp) => {
      console.log(resp);
      setBusinessList(resp.businessLists);
    });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Reseacch & Discoveries"} isViewAll={true} />
      <FlatList
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={{ marginRight: 10 }}>
            <DoctorsListtitle doctor={item}/>
          </View>
        )}
      />
    </View>
  );
}
