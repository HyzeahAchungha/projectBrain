import { View, Text, StatusBar,StyleSheet } from "react-native";
import * as SecureStore from 'expo-secure-store';
import React from "react";
import TabNavigation from './App/Navigations/TabNavigation'
import Login from "./App/Screens/LoginScreen/Login";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from 'expo-font';

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {
  const [loaded, error] = useFonts({
    'outfit': require('./assets/font/Outfit-Regular.ttf'),
    'outfit-medium': require('./assets/font/Outfit-Medium.ttf'),
    'outfit-bold': require('./assets/font/Outfit-Bold.ttf'),
  });
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={
        "pk_test_bGVuaWVudC1nYXJmaXNoLTUyLmNsZXJrLmFjY291bnRzLmRldiQ"
      }
    >
      <View style={styles.container}>
        {/* signed components */}
        <SignedIn>
         <NavigationContainer>
            <TabNavigation/>
         </NavigationContainer>
        </SignedIn>

        {/* sigout component */}
        <SignedOut>
          <Login />
        </SignedOut>
        <StatusBar style="auto" />

      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
});
