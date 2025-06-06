import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function ScreenLogin() {
    const rutas = useNavigation();

  return (
    <View style={{ padding: 10, flex: 1, justifyContent: "center" }}>
      <Text style={{ textAlign:'center'}} variant="displayLarge">Login</Text>
      <TextInput style={{ marginTop: 10 }} label="Email" value="" onChangeText={{}} />
      <TextInput style={{ marginTop: 10 }} label="Password" value="" secureTextEntry onChangeText={{}} />
      <Button style={{ marginTop: 10 }} icon="login" mode="contained" onPress={()=>rutas.push("Menu")}>
        Login
      </Button>
      <Button
        style={{ marginTop: 10 }}
        icon="account-multiple-plus"
        mode="outlined"
        onPress={() => rutas.push("ScreenCrearCuenta")}
      >
        Crear cuenta
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({});
