import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import Heading from '../../Component/Heading'

export default function DoctorsPhotos({doctor}) {
  return (
    <View>
      <Heading text={'Related Doctors'}/>

      <FlatList
      data={doctor.images}
      numColumns={2}
      renderItem={({item, index})=>(
        <Image source={{uri:item?.url}} style={{width:'100%',  flex:1, height:130,borderRadius:15, 
            margin:7, object:"fit"
        }}/>
      )}
      
      />
    </View>
  )
}