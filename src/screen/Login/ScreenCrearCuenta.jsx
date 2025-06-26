import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { estadoLoginGlobal } from '../../context/contextdata';

export default function ScreenCrearCuenta() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [verpw, setVerpw] = useState(true); // Mostrar/Ocultar contraseña
  const [loading, setLoading] = useState(false); // Estado de carga

  const { login } = useContext(estadoLoginGlobal);
  const navigation = useNavigation();

  const handleCrearCuenta = async () => {
    if (!nombre.trim() || !email.trim() || !pw.trim()) {
      Alert.alert("Atención", "Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      nombre,
      pw,
      email,
      status: 1,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch('http://192.168.137.1:5000/api/usuarios/agregar', requestOptions);
      const result = await response.json();

      if (result.body?.status === true) {
        Alert.alert("Cuenta creada", result.body.mensaje || "Cuenta creada exitosamente.", [
          {
            text: "Iniciar sesión",
            onPress: () => navigation.navigate('login'),
          },
        ]);
      } else {
        Alert.alert("Mensaje", result.body?.mensaje || "Ocurrió un error.");
      }
    } catch (error) {
      console.error("Error al crear cuenta:", error);
      Alert.alert("Error", "No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f6fa',
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#1976D2',
      marginBottom: 24,
      textAlign: 'center',
    },
    label: {
      fontSize: 16,
      color: '#1976D2',
      marginBottom: 4,
      marginTop: 12,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#b0bec5',
      backgroundColor: '#fff',
      borderRadius: 8,
      marginBottom: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 8,
    },
    input: {
      flex: 1,
      padding: 12,
      fontSize: 16,
      color: '#333',
    },
    buttonContainer: {
      marginTop: 24,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      backgroundColor: "#0984e3",
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>

      <Text style={styles.label}>Nombre</Text>
      <View style={styles.inputWrapper}>
        <MaterialIcons name="person" size={24} color="#1976D2" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ingresa tu nombre"
          placeholderTextColor="#aaa"
        />
      </View>

      <Text style={styles.label}>Email</Text>
      <View style={styles.inputWrapper}>
        <MaterialIcons name="email" size={24} color="#1976D2" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="correo@ejemplo.com"
          placeholderTextColor="#aaa"
        />
      </View>

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.inputWrapper}>
        <MaterialIcons name="key" size={24} color="#1976D2" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={pw}
          onChangeText={setPw}
          secureTextEntry={verpw}
          placeholder="********"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity onPress={() => setVerpw(!verpw)}>
          <MaterialIcons name={verpw ? "visibility-off" : "visibility"} size={24} color="#1976D2" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleCrearCuenta}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginTop: 20, alignItems: "center" }}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={{ color: "#0984e3", fontWeight: "bold" }}>
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
}
