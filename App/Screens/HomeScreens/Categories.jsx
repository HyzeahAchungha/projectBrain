import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalApi from "../../Utils/GlobalApi";
import Heading from "../../Component/Heading";
import Color from "../../Utils/Color";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function Categories() {
  const [Categories, setCategories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  /**
   * Get categories
   */

  const getCategories = () => {
    GlobalApi.getCategories().then((resp) => {
      setCategories(resp?.categories);
    });
  };

  return (
    <View style={{ marginTop: 10 }}>
      <Heading text={"Categories"} isViewAll={true} />
      <FlatList
        data={Categories}
        numColumns={4}
        renderItem={({ item, index }) =>
          index <= 3 && (
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.push("doctor_list", { category: item.name })
              }
            >
              <View style={styles.iconsContainer}>
                <Image
                  source={{ uri: item?.icons?.url }}
                  style={{ width: 30, height: 30 }}
                />
              </View>
              <Text style={{ fontFamily: "outfit-medium", marginTop: 5 }}>
                {item?.name}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding:10
  },
  iconsContainer: {
    backgroundColor: Color.LIGHT_GRAY,
    padding: 17,
    borderRadius: 99,
  },
});
