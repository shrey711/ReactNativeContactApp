import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const FavouriteIcon = () => {
    const navigation=useNavigation()
    const [isPressed,setIsPressed]=useState(false)

    
    const handlePress=()=>{
        setIsPressed(!isPressed)
        navigation.navigate('Add Contacts',{data:!isPressed})   
    }
  return (
    <View >
        <TouchableOpacity onPress={handlePress} activeOpacity={0.5}>
            <FontAwesome name="star" size={24} color={isPressed?"#884dff":"#a6a6a6"} />
        </TouchableOpacity>
    </View>
  )
}

export default FavouriteIcon