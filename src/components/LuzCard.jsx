import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Card,  Text, Switch, useTheme} from "react-native-paper";
import { estadoDevicesGlobal } from "../context/contextdata";


// Botón de texto personalizado con emoji
const BotonTexto = ({ icon, color, onPress, size = 18, disabled = false }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} style={{ marginHorizontal: 4 }}>
    <Text style={{ color: disabled ? "#aaa" : color, fontSize: size }}>{icon}</Text>
  </TouchableOpacity>
);

export default function LuzCard(props) {
  const theme = useTheme();
  const [nombre, setNombre] = useState(props.luz.nombre || "");
  const [intensidad, setIntensidad] = useState(props.luz.intensidad || 0);
  const [modoEditarNombre, setModoEditarNombre] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(nombre);

  const { cambiarEstadoLuz, obtenerEstadoLuz } = useContext(estadoDevicesGlobal);
  const estado = obtenerEstadoLuz(props.luz.id);

  useEffect(() => {
    console.log(`Luz ID ${props.luz.id} - Estado: ${estado ? "ON" : "OFF"} - Intensidad: ${intensidad}%`);
  }, [estado, intensidad]);

  const actualizarCampo = async (campo, valor) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      id: props.luz.id,
      nombre: campo === "nombre" ? valor : nombre,
      estado: campo === "estado" ? valor : estado ? "encendida" : "apagada",
      intensidad: campo === "intensidad" ? valor : intensidad,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/luces/actualizar", requestOptions);
      const resultado = await response.json();
      console.log(`Campo ${campo} actualizado:`, resultado);
      props.recargarLuces();
    } catch (error) {
      console.error(`Error al actualizar ${campo}:`, error);
    }
  };

  const eliminarLuz = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ id: props.luz.id });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/luces/eliminar", requestOptions);
      const resultado = await response.json();
      console.log(`Luz eliminada: ${nombre}`, resultado);
      props.recargarLuces();
    } catch (error) {
      console.error("Error al eliminar luz:", error);
    }
  };

  const guardarNombre = () => {
    if (nombreTemp !== nombre) {
      setNombre(nombreTemp);
      actualizarCampo("nombre", nombreTemp);
    }
    setModoEditarNombre(false);
  };

  const actualizarEstado = () => {
    cambiarEstadoLuz(props.luz.id);
    actualizarCampo("estado", !estado ? "encendida" : "apagada");
  };

  const actualizarIntensidad = (valor) => {
    setIntensidad(valor);
    actualizarCampo("intensidad", valor);
  };

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        {/* Header */}
        <View style={styles.header}>
          {modoEditarNombre ? (
            <View style={styles.editContainer}>
              <TextInput
                value={nombreTemp}
                onChangeText={setNombreTemp}
                style={[styles.input, { backgroundColor: theme.colors.surface }]}
                placeholder="Nombre de la luz"
                autoFocus
              />
              <View style={styles.editButtons}>
                <BotonTexto icon="✔️" color={theme.colors.primary} onPress={guardarNombre} />
                <BotonTexto icon="❌" color={theme.colors.error} onPress={() => setModoEditarNombre(false)} />
              </View>
            </View>
          ) : (
            <View style={styles.titleContainer}>
              <Text
                variant="titleMedium"
                style={[styles.title, { color: "#0984e3"
                 }]}
                onPress={() => setModoEditarNombre(true)}
              >
                {nombre || "Nueva luz"}
              </Text>
              <BotonTexto icon="🗑️" color={theme.colors.error} onPress={eliminarLuz} />
            </View>
          )}
        </View>

        {/* Estado */}
        <View style={styles.statusRow}>
          <View style={styles.statusInfo}>
            <Text style={{ fontSize: 18 }}>{estado ? "💡" : "💤"}</Text>
            <Text variant="bodyMedium" style={{ marginLeft: 6 }}>
              {estado ? "Encendida" : "Apagada"}
            </Text>
          </View>
          <Switch
            value={estado}
            onValueChange={actualizarEstado}
            color={"#0984e3"
            }
          />
        </View>

        {/* Intensidad */}
        <View style={styles.intensityContainer}>
          <Text variant="labelLarge" style={styles.intensityLabel}>
            Intensidad: {intensidad}%
          </Text>
          <View style={styles.intensityButtons}>
            <BotonTexto
              icon="➖"
              size={20}
              onPress={() => actualizarIntensidad(Math.max(intensidad - 5, 0))}
              disabled={!estado}
              color={estado ? theme.colors.primary : theme.colors.outline}
            />
            <Text style={{ marginHorizontal: 8 }}>{intensidad}%</Text>
            <BotonTexto
              icon="➕"
              size={20}
              onPress={() => actualizarIntensidad(Math.min(intensidad + 5, 100))}
              disabled={!estado}
              color={estado ? theme.colors.primary : theme.colors.outline}
            />
          </View>
          <View style={styles.sliderMarks}>
            <Text variant="labelSmall">0%</Text>
            <Text variant="labelSmall">50%</Text>
            <Text variant="labelSmall">100%</Text>
          </View>
        </View>

        {/* Consumo */}
        <View style={styles.consumptionContainer}>
          <View style={styles.consumptionItem}>
            <Text style={{ fontSize: 16 }}>⚡</Text>
            <Text variant="bodySmall" style={{ marginLeft: 4 }}>
              Consumo: {estado ? `${Math.round(intensidad * 0.1)}W` : "0W"}
            </Text>
          </View>
          <View style={styles.consumptionItem}>
            <Text style={{ fontSize: 16 }}>⏰</Text>
            <Text variant="bodySmall" style={{ marginLeft: 4 }}>
              Último uso: Hoy
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    borderRadius: 16,
    elevation: 2,
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    flex: 1,
    fontWeight: "600",
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
  },
  editButtons: {
    flexDirection: "row",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statusInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  intensityContainer: {
    marginBottom: 16,
  },
  intensityLabel: {
    marginBottom: 8,
  },
  sliderMarks: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  consumptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  consumptionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  intensityButtons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
});
