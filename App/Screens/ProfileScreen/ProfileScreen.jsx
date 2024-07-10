import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import Color from '../../Utils/Color'
import { FlatList } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
export default function ProfileScreen() {
  const {user}=useUser()
  const profileMenu = [
    {
      id: 1,
      name: 'Home',
      icons: 'home',
    },
    {
      id: 2,
      name: 'My Bookings',
      icons: 'bookmark-sharp',
    },
    {
      id: 3,
      name: 'Logout',
      icons: 'log-out',
    },
    {
      id: 4,
      name: 'Chats',
      icons: 'chatbubbles-outline',
    },
  ];
  
  return (
    <View>
    <View style={{padding:20,paddingTop:30,   backgroundColor:Color.PRIMARY}}>
      <Text style={{fontSize:30,fontFamily:'outfit-bold', color:Color.WHITE}}>ProfileScreen</Text>
      <View style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding:20,
     
      }}>
        <Image source={{uri:user.imageUrl}}  style={{width:90, height:90, borderRadius:99}}/>
        <Text style={{fontSize:26, marginTop:8, fontFamily:'outfit-medium', color:Color.WHITE}}>{user.fullName}</Text>
        <Text style={{fontSize:18, marginTop:8, fontFamily:'outfit-medium', color:Color.WHITE}}>{user?.primaryEmailAddress.emailAddress}</Text>
      </View>
    </View>
    <View style={{paddingTop:60}}>
  

<FlatList
      data={profileMenu}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginBottom: 40,
            paddingHorizontal: 80,
          }}
        >
          <Ionicons name={item.icons} size={35} color={Color.PRIMARY} style={{ marginRight: 10 }} />
          <Text style={{ fontFamily: 'outfit', fontSize: 20 }}>{item.name}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
    </View>
    </View>
  )
}