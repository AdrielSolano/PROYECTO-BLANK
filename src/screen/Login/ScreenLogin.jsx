import React, { useState, useContext } from "react";
import { Alert, View } from "react-native";
import { TextInput, Button, Text, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { estadoLoginGlobal } from "../../context/contextdata";
import { TouchableOpacity } from "react-native-gesture-handler";




export default function ScreenLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verpw, setVerpw] = useState(true);

  const navigation = useNavigation();
  const api = process.env.EXPO_PUBLIC_API_URL;

  const { login } = useContext(estadoLoginGlobal);

  const handlogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert("Atención", "Rellena todos los campos");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      user: email,
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

try {
  const response = await fetch("http://192.168.137.1:5000/api/usuarios/login", requestOptions);
  const result = await response.json(); 

  if (result.body.status === true) {
    Alert.alert("Bienvenido", result.body.user.nombre);
    login();
  } else {
    Alert.alert("Mensaje", result.body.mensaje);
  }

  console.log(result);
} catch (error) {
  console.error("Error en login:", error);
  Alert.alert("Error", "No se pudo conectar con el servidor.");
}

  };

  return (
    <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#f5f6fa", padding: 20 }}>
      <Text style={{ textAlign: 'center', marginBottom: 30, color: "#2d3436" }} variant="displayLarge">
        Login
      </Text>

      <TextInput
        style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 8 }}
        label="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
        left={<TextInput.Icon icon="account" color="#0984e3"/>}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColor="#0984e3"
        activeUnderlineColor="#0984e3"
      />
      <TextInput
        style={{ marginTop: 10, backgroundColor: "#fff", borderRadius: 8 }}
        label="Password"
        value={password}
        secureTextEntry={verpw}
        right={
          <TextInput.Icon
            icon={verpw ? "eye" : "eye-off"}
            onPress={() => setVerpw(!verpw)}
            color="#0984e3"
          />
        }
        left={<TextInput.Icon icon="key" color="#0984e3" />}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColor="#0984e3"
        activeUnderlineColor="#0984e3"
      />

      <Button
        style={{ marginTop: 20, padding: 10, borderRadius: 8, backgroundColor: "#0984e3" }}
        icon="login"
        mode="contained"
        onPress={handlogin}
        labelStyle={{ color: "#fff", fontWeight: "bold" }}
      >
        Iniciar Sesión
      </Button>

      <TouchableOpacity
        style={{ marginTop: 20, alignItems: "center" }}
        onPress={() => navigation.navigate('crearcuenta')}
      >
        <Text style={{ color: "#0984e3", fontWeight: "bold" }}>¿No tienes cuenta? Crea una</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 10, alignItems: "center" }}
        onPress={() => navigation.navigate('recuperar')}
      >
        <Text style={{ color: "#636e72" }}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
}
