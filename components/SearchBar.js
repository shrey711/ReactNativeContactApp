import { View, Text ,TextInput,StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Octicons } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchTerm,setSearchTerm]=useState("");
  const navigation=useNavigation();
  //console.log("from searchbar",searchTerm)
  const onSearch=(text)=>{
    setSearchTerm(text)
    //console.log("transfer",text)
    navigation.navigate('Contacts List',{data:text})
  }
  const handleThreeBarPress=()=>{
    navigation.dispatch(DrawerActions.openDrawer())
  }
  return (
    <View style={styles.touchable}>
      <TouchableOpacity onPress={handleThreeBarPress} >
      <Octicons name="three-bars" size={24} color="#884dff" />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search "
                  placeholderTextColor="black"
                  value={searchTerm}
                  onChangeText={onSearch}
                  
                />
      </View>
    </View>
    
    
    
  )
}

const styles=StyleSheet.create({
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight:25,
       
      
      },
      searchInput: {
        flex: 1,
        color: '#1a75ff',
        borderWidth: 2,
        borderColor: '#884dff',
        borderRadius: 15,
        padding:10,
        margin:10,
        marginLeft:15
        
      },
      touchable:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        
      }
});

export default SearchBar