import { View, Text, Button, StyleSheet,} from "react-native";

import {launchCamera} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import * as DocumentPicker from 'expo-document-picker';
import React from 'react';

export default function Document() {
  const handleCameraLaunch = async (isCamera) => {
    const options = {
      mediaType: isCamera ? 'photo' : 'video',
    };

    try {
      const response = await launchCamera(options);
      console.log('pickedFile',response);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      console.log('pickedFile',pickedFile);
      
      await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
        console.log('base64',data);
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log(err);
      } else {
        console.log(error);
        throw err;
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
       <Button title="Camera" onPress={async () => {
              handleCameraLaunch(true);
          }} />
       <Button title="Video" onPress={async () => {
              handleCameraLaunch(false);
          }} />
          <Button title="Gallary" onPress={async () => {
              uploadFileOnPressHandler();
          }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  documentInfo: {
    marginTop: 20,
  },
});
