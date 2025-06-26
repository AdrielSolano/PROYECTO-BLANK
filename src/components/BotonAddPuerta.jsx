import React from "react";
import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function BotonAddPuerta({ recargarPuertas }) {
  const theme = useTheme();
  
  const agregarPuerta = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      nombre: "Nueva puerta",
      estado: "cerrada",
      registro_entrada: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/puertas/agregar", requestOptions);
      const resultado = await response.json();
      console.log("Nueva puerta agregada:", resultado);
      if (recargarPuertas) recargarPuertas();
    } catch (error) {
      console.error("Error al agregar nueva puerta:", error);
    }
  };

  return (
    <Button
      icon="door"
      mode="contained-tonal"
      onPress={agregarPuerta}
      style={[styles.boton, { backgroundColor: "#0984e3" }]}
      labelStyle={[styles.label, { color: "#fff" }]}
      contentStyle={styles.content}
      textColor="#fff"
      iconColor="#fff"
    >
      Añadir puerta
    </Button>
  );
}

const styles = StyleSheet.create({
  boton: {
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    height: 48,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});