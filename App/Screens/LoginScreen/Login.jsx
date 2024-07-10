import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import React from "react";
import Color from "../../Utils/Color";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking"
import { useWarmUpBrowser } from "../../hooks/useWarmBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL("/dashboard", { scheme: "project" })});

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("./../../../assets/images/login.png")}
        style={styles.loginImage}
      />

      <View style={styles.subContainer}>
        <Text style={{ fontSize: 27, color: Color.WHITE, textAlign: "center" }}>
          Let's find a
          <Text style={{ fontWeight: "bold" }}> professional genomic</Text>
          who can advice you on genetic
        </Text>

        <Text
          style={{
            fontSize: 17,
            color: Color.WHITE,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Best App to know your genotics and genotype by professional services
        </Text>

        <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
          <Text
            style={{ textAlign: "center", fontSize: 17, color: Color.PRIMARY }}
          >
            {" "}
            Let's get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  loginImage: {
    width: 230,
    height: 450,
    marginTop: 70,
    borderWidth: 4,
    borderColor: Color.BLACK,
    borderRadius: 15,
  },
  subContainer: {
    width: "100%",
    backgroundColor: Color.PRIMARY,
    height: "70%",
    marginTop: -20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  buttonStyle: {
    padding: 15,
    backgroundColor: Color.WHITE,
    borderRadius: 99,
    marginTop: 10,
  },
});
