import { View, Text } from 'react-native'
import React from 'react'
import TabNavigator from './TabNavigator'
import Favourites from '../screens/Favourites'
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer=createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
            <Drawer.Screen name='Home' component={TabNavigator}
              options={{
                headerShown:false
              }}
             />
            <Drawer.Screen name='Favourites' component={Favourites}
              options={
                {
                  headerShown:false
                }
              }
            />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator