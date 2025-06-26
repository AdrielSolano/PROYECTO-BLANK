import React from "react";
import { StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

export default function BotonAddLight({ recargarLuces }) {
  const theme = useTheme();
  
  const agregarLuz = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: 0,
      nombre: "nueva luz",
      estado: "apagada",
      intensidad: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/luces/agregar", requestOptions);
      const resultado = await response.json();
      console.log("Nueva luz agregada:", resultado);
      if (recargarLuces) recargarLuces();
    } catch (error) {
      console.error("Error al agregar nueva luz:", error);
    }
  };

  return (
    <Button
      icon="lightbulb-on-outline"
      mode="contained-tonal"
      onPress={agregarLuz}
      style={[styles.boton, { backgroundColor: "#0984e3" }]}
      labelStyle={[styles.label, { color: "#fff" }]}
      contentStyle={styles.content}
      textColor="#fff"
      iconColor="#fff"
    >
      Añadir dispositivo
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