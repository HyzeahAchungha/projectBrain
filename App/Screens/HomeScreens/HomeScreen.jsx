import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "./Header";
import Slider from "./Slider";
import Categories from "./Categories";
import BusinessList from "./BusinessList";
import Document from "./Document";

export default function HomeScreen() {
  return (
    <ScrollView>
      {/* Header */}
      <Header />
      {/* Slider */}

      <View style={{ padding: 20 }}>
        <Slider />

        {/* Category */}

        <Categories />

        {/* BusinessList */}
        <BusinessList />

        {/* DocumentUploadScreen  */}
        <Document/>

      </View>
    </ScrollView>
  );
}
