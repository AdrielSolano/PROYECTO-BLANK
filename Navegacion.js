import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Contexto global
import { estadoLoginGlobal } from "./src/context/contextdata";

// Screens principales
import ScreenAcercade from './src/screen/acercade/ScreenAcercade';
import ScreenHome from './src/screen/home/ScreenHome';
import ScreenSetting from './src/screen/setting/ScreenSetting';
import ScreenNotifications from "./src/screen/notifications/ScreenNotifications";

// Hijos del home
import DetallesHome from "./src/screen/home/DetallesHome";
import LucesCasa from "./src/screen/home/LucesCasa";
import PuertasCasa from "./src/screen/home/PuertasCasa";

// Screens de login
import ScreenCrearCuenta from "./src/screen/Login/ScreenCrearCuenta";
import ScreenLogin from "./src/screen/Login/ScreenLogin";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MyStackHome() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Inicio"
        component={ScreenHome}
        options={{ headerBackTitleVisible: false, title: '', headerShown: true }}
      />
      <Stack.Screen
        name="DetallesHome"
        component={DetallesHome}
        options={{ headerBackTitleVisible: false, title: '', headerShown: true }}
      />
      <Stack.Screen
        name="LucesCasa"
        component={LucesCasa}
        options={{ headerBackTitleVisible: false, title: '', headerShown: true }}
      />
      <Stack.Screen
        name="PuertasCasa"
        component={PuertasCasa}
        options={{ headerBackTitleVisible: false, title: '', headerShown: true }}
      />
    </Stack.Navigator>
  );
}

function MyStackLogin() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={ScreenLogin} />
      <Stack.Screen name="crearcuenta" component={ScreenCrearCuenta} />
      <Stack.Screen name="menu" component={MyTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="TabInicio"
        component={MyStackHome}
        options={{
          headerShown: false,
          title: 'Inicio',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
          tabBarActiveTintColor: '#0984e3',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'lightgray' },
        }}
      />
      <Tab.Screen
        name="AcercaDe"
        component={ScreenAcercade}
        options={{
          title: 'Acerca de',
          tabBarIcon: ({ color }) => <FontAwesome name="user-circle-o" size={24} color={color} />,
          tabBarActiveTintColor: '#0984e3',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'lightgray' },
        }}
      />
      <Tab.Screen
        name="Configuracion"
        component={ScreenSetting}
        options={{
          title: 'Configuración',
          tabBarIcon: ({ color }) => <FontAwesome name="gear" size={24} color={color} />,
          tabBarActiveTintColor: '#0984e3',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'lightgray' },
        }}
      />
      <Tab.Screen
        name="Notificaciones"
        component={ScreenNotifications}
        options={{
          title: 'Notificaciones',
          tabBarIcon: ({ color }) => <FontAwesome name="bell" size={24} color={color} />,
          tabBarActiveTintColor: '#0984e3',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: 'lightgray' },
          tabBarBadge: '3',
        }}
      />
    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Dashboard"
        component={MyTabs}
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color }) => <FontAwesome name="dashboard" size={24} color={color} />,
          drawerActiveTintColor: '#0984e3',
          drawerInactiveTintColor: 'gray',
          drawerStyle: { backgroundColor: 'lightgray' },
        }}
      />
      <Drawer.Screen
        name="Perfil"
        component={MyStackHome}
        options={{
          title: 'Perfil',
          drawerIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
          drawerActiveTintColor: '#0984e3',
          drawerInactiveTintColor: 'gray',
          drawerStyle: { backgroundColor: 'lightgray' },
        }}
      />
      <Drawer.Screen
        name="NotificacionesDrawer"
        component={MyStackHome}
        options={{
          title: 'Notificaciones',
          drawerIcon: ({ color }) => <FontAwesome name="bell" size={24} color={color} />,
          drawerActiveTintColor: '#0984e3',
          drawerInactiveTintColor: 'gray',
          drawerStyle: { backgroundColor: 'lightgray' },
        }}
      />
      <Drawer.Screen
        name="Ajustes"
        component={MyStackHome}
        options={{
          title: 'Ajustes',
          drawerIcon: ({ color }) => <FontAwesome name="cog" size={24} color={color} />,
          drawerActiveTintColor: '#0984e3',
          drawerInactiveTintColor: 'gray',
          drawerStyle: { backgroundColor: 'lightgray' },
        }}
      />
    </Drawer.Navigator>
  );
}

export default function Navegacion() {
  const { isLogin } = useContext(estadoLoginGlobal);

  console.log("Estado de login:", isLogin);

  return (
    <>
      {isLogin ? <MyDrawer /> : <MyStackLogin />}
    </>
  );
}
