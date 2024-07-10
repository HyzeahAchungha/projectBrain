import { View, Text,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import Heading from '../../Component/Heading'
import Color from '../../Utils/Color';
export default function DoctorAboutScreen({doctor}) {
    const [isReadMore, setIsReadMore] = useState(false);
  return doctor&&(
    <View>
       <View>
              <Heading text={"About Me"} />
              <Text
                style={{
                  fontFamily: "outfit",
                  color: Color.GRAY,
                  lineHeight: 28,
                  fontSize: 16,
                }}
                numberOfLines={isReadMore ? 10 : 5}
              >
                {doctor.about}
              </Text>
              <TouchableOpacity onPress={() => setIsReadMore(!isReadMore)}>
                <Text
                  style={{
                    color: Color.PRIMARY,
                    fontSize: 16,
                    fontFamily: "outfit",
                  }}
                >
                  {isReadMore ? "Read Less" : "Read More"} 
                </Text>
              </TouchableOpacity>
            </View>
    </View>
  )
}