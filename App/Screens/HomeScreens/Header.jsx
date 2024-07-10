import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-react";
import Color from "../../Utils/Color";
import Feather from "@expo/vector-icons/Feather";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  const { user, isLoading } = useUser();
  return (
    user && (
      <View style={styles.container}>
        {/* profile section */}

        <View style={styles.profileMainContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: user?.imageUrl }} style={styles.userImage} />
            <View>
              <Text style={{ color: Color.WHITE, fontFamily: "outfit" }}>
                welcome back
              </Text>
              <Text
                style={{
                  color: Color.WHITE,
                  fontSize: 20,
                  fontFamily: "outfit-medium",
                }}
              >
                {" "}
                {user?.fullName}
              </Text>
            </View>
          </View>
          <FontAwesome name="bookmark-o" size={27} color="white" />
        </View>

        {/* SearchBar section */}
        <View style={styles.searchBarContainer}>
          <TextInput placeholder="Search" style={styles.textInput} />
          <Feather
            name="search"
            size={24}
            color={Color.PRIMARY}
            style={styles.searchBar}
          />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Color.PRIMARY,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  profileMainContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textInput: {
    padding: 7,
    paddingHorizontal: 16,
    backgroundColor: Color.WHITE,
    borderRadius: 8,
    width: "85%",
    fontSize: 16,
  },
  searchBarContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  searchBar: {
    backgroundColor: Color.WHITE,
    padding: 10,
    borderRadius: "50%",
  },

  userImage: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
});
