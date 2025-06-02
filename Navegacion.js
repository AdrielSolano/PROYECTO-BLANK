import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

// Llamar los screen principales
import ScreenAcercade from './screen/acercade/ScreenAcercade';
import ScreenHome from './screen/home/ScreenHome';
import ScreenSetting from './screen/setting/ScreenSetting';
import ScreenNotifications from "./screen/notifications/ScreenNotifications";

function MyTabs() {
   return (
      <Tab.Navigator>
         <Tab.Screen
            name="Home"
            component={ScreenHome} options={{
               title: 'Home',
               tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color="color" />,
               tabBarActiveTintColor: 'blue',
               tabBarInactiveTintColor: 'gray',
               tabBarStyle: { backgroundColor: 'lightgray' }
            }} />
         <Tab.Screen
            name="About"
            component={ScreenAcercade} options={{
               title: 'About',
               tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color="color" />,
               tabBarActiveTintColor: 'blue',
               tabBarInactiveTintColor: 'gray',
               tabBarStyle: { backgroundColor: 'lightgray' }

            }} />
         <Tab.Screen
            name="Setting"
            component={ScreenSetting} options={{
               title: 'Setting',
               tabBarIcon: ({ color }) => <FontAwesome name="gear" size={24} color="color" />,
               tabBarActiveTintColor: 'blue',
               tabBarInactiveTintColor: 'gray',
               tabBarStyle: { backgroundColor: 'lightgray' },
            }} />
            <Tab.Screen
            name="Notifications"
            component={ScreenNotifications} options={{
               title: 'Notifications',
               tabBarIcon: ({ color }) => <FontAwesome name="bell" size={24} color="color" />,
               tabBarActiveTintColor: 'blue',
               tabBarInactiveTintColor: 'gray',
               tabBarStyle: { backgroundColor: 'lightgray' },
               tabBarBadge: '3'
            }} />
      </Tab.Navigator>
   )
}

export default function navigation() {
   return (
      <MyTabs />
   )
}
