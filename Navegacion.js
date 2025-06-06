import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


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
            options={{
               headerShown: false,
            }}
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


function MyDrawer() {
   return (
      <Drawer.Navigator>
         <Drawer.Screen
            name="Dash"
            component={MyStackHome}
            options={{
               title: 'Dashboard',
               drawerIcon: ({ color }) => <FontAwesome name="dashboard" size={24} color="color" />,
               drawerActiveTintColor: 'blue',
               drawerInactiveTintColor: 'gray',
               drawerStyle: { backgroundColor: 'lightgray' }
            }} />
         <Drawer.Screen
            name="notificaciones"
            component={MyStackHome}
            options={{
               title: 'Notifications',
               drawerIcon: ({ color }) => <FontAwesome name="bell" size={24} color="color" />,
               drawerActiveTintColor: 'blue',
               drawerInactiveTintColor: 'gray',
               drawerStyle: { backgroundColor: 'lightgray' }
            }}
         />
         <Drawer.Screen
            name="perfin"
            component={MyStackHome}
            options={{
               title: 'Perfil',
               drawerIcon: ({ color }) => <FontAwesome name="user" size={24} color="color" />,
               drawerActiveTintColor: 'blue',
               drawerInactiveTintColor: 'gray',
               drawerStyle: { backgroundColor: 'lightgray' }
            }} />
         <Drawer.Screen
            name="settings"
            component={MyStackHome}
            options={{
               title: 'Settings',
               drawerIcon: ({ color }) => <FontAwesome name="cog" size={24} color="color" />,
               drawerActiveTintColor: 'blue',
               drawerInactiveTintColor: 'gray',
               drawerStyle: { backgroundColor: 'lightgray' }
            }} />
      </Drawer.Navigator>
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
   const login = true;
   return (
      <>
         <MyDrawer />
      </>
   )
}
