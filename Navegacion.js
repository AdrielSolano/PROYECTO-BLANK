import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// Llamar los screen principales
import ScreenAcercade from './screen/acercade/ScreenAcercade';
import ScreenHome from './screen/home/ScreenHome';
import ScreenSetting from './screen/setting/ScreenSetting';
import ScreenNotifications from "./screen/notifications/ScreenNotifications";

//llamar los creen hijos home
import DetallesHome from "./screen/home/DetallesHome";
import LucesCasa from "./screen/home/LucesCasa";
import PuertasCasa from "./screen/home/PuertasCasa";
import ScreenCrearCuenta from "./screen/Login/ScreenCrearCuenta";
import ScreenLogin from "./screen/Login/ScreenLogin";

//llamar los screen login


function MyStackHome() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="Home"
            component={ScreenHome}
         />
         <Stack.Screen
            name="DetallesHome"
            component={DetallesHome}
         />
         <Stack.Screen
            name="LucesCasa"
            component={LucesCasa}
         />
         <Stack.Screen
            name="PuertasCasa"
            component={PuertasCasa}
         />
      </Stack.Navigator>
   )
}

function MyStackLogin() {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name="ScreenLogin"
            component={ScreenLogin}
         />
         <Stack.Screen
            name="ScreenCrearCuenta"
            component={ScreenCrearCuenta}
         />
         <Stack.Screen
            name="Menu"
            component={MyTabs}
            options={{ headerShown: false }}
         />
      </Stack.Navigator>
   )
}

function MyTabs() {
   return (
      <Tab.Navigator>
         <Tab.Screen
            name="Home"
            component={MyStackHome} options={{
               headerShown: false,
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
      //<MyTabs />
      <MyStackLogin/>

   )
}
