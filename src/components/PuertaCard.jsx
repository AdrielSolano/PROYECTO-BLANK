import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Card, Text, Switch, useTheme } from "react-native-paper";
import { estadoDevicesGlobal } from "../context/contextdata";

// Botón de texto personalizado con emoji
const BotonTexto = ({ icon, color, onPress, size = 18, disabled = false }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled} style={{ marginHorizontal: 4 }}>
    <Text style={{ color: disabled ? "#aaa" : color, fontSize: size }}>{icon}</Text>
  </TouchableOpacity>
);

export default function PuertaCard(props) {
  const theme = useTheme();
  const [nombre, setNombre] = useState(props.puerta.nombre || "");
  const [registroEntrada, setRegistroEntrada] = useState(props.puerta.registro_entrada || 0);
  const [modoEditarNombre, setModoEditarNombre] = useState(false);
  const [nombreTemp, setNombreTemp] = useState(nombre);

  const { cambiarEstadoPuerta, obtenerEstadoPuerta } = useContext(estadoDevicesGlobal);
  const estado = obtenerEstadoPuerta(props.puerta.id);

  useEffect(() => {
    console.log(`Puerta ID ${props.puerta.id} - Estado: ${estado ? "Abierta" : "Cerrada"} - Entradas: ${registroEntrada}`);
  }, [estado, registroEntrada]);

  const actualizarCampo = async (campo, valor, estadoOverride = null) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const estadoParaEnviar = estadoOverride !== null ? estadoOverride : (estado ? "abierta" : "cerrada");

    const raw = JSON.stringify({
      id: props.puerta.id,
      nombre: campo === "nombre" ? valor : nombre,
      estado: campo === "estado" ? valor : estadoParaEnviar,
      registro_entrada: campo === "registro_entrada" ? valor : registroEntrada,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/puertas/actualizar", requestOptions);
      const resultado = await response.json();
      console.log(`Campo ${campo} actualizado:`, resultado);
      
      if (campo === "nombre") {
        props.recargarPuertas();
      }
    } catch (error) {
      console.error(`Error al actualizar ${campo}:`, error);
    }
  };

  const eliminarPuerta = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({ id: props.puerta.id });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/puertas/eliminar", requestOptions);
      const resultado = await response.json();
      console.log(`Puerta eliminada: ${nombre}`, resultado);
      props.recargarPuertas();
    } catch (error) {
      console.error("Error al eliminar puerta:", error);
    }
  };

  const guardarNombre = () => {
    if (nombreTemp !== nombre) {
      setNombre(nombreTemp);
      actualizarCampo("nombre", nombreTemp);
    }
    setModoEditarNombre(false);
  };

  const actualizarEstado = async () => {
    const nuevoEstado = !estado;
    const nuevoEstadoString = nuevoEstado ? "abierta" : "cerrada";

    try {
      cambiarEstadoPuerta(props.puerta.id);
      await actualizarCampo("estado", nuevoEstadoString);

      if (nuevoEstado) {
        const nuevoRegistro = registroEntrada + 1;
        setRegistroEntrada(nuevoRegistro);
        await actualizarCampo("registro_entrada", nuevoRegistro, nuevoEstadoString);
      }
    } catch (error) {
      console.error("Error al actualizar estado:", error);
      cambiarEstadoPuerta(props.puerta.id);
    }
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
                style={[styles.input, { backgroundColor: "#0984e3" }]}
                placeholder="Nombre de la puerta"
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
                style={[styles.title, { color: "#0984e3" }]}
                onPress={() => setModoEditarNombre(true)}
              >
                {nombre || "Nueva puerta"}
              </Text>
              <BotonTexto icon="🗑️" color={"#0984e3"} onPress={eliminarPuerta} />
            </View>
          )}
        </View>

        {/* Estado */}
        <View style={styles.statusRow}>
          <View style={styles.statusInfo}>
            <Text style={{ fontSize: 18 }}>{estado ? "🚪" : "🔒"}</Text>
            <Text variant="bodyMedium" style={{ marginLeft: 6 }}>
              {estado ? "Abierta" : "Cerrada"}
            </Text>
          </View>
          <Switch
            value={estado}
            onValueChange={actualizarEstado}
            color="#0984e3"
          />
        </View>

        {/* Registro de entradas */}
        <View style={styles.registroContainer}>
          <Text variant="labelLarge" style={styles.registroLabel}>
            Entradas registradas: {registroEntrada}
          </Text>
          <View style={styles.registroInfo}>
            <Text variant="bodySmall">
              Cada apertura incrementa el contador
            </Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsContainer}>
          <View style={styles.actionItem}>
            <Text style={{ fontSize: 16 }}>🔄</Text>
            <Text variant="bodySmall" style={{ marginLeft: 4 }}>
              Último acceso: Hoy
            </Text>
          </View>
          <View style={styles.actionItem}>
            <Text style={{ fontSize: 16 }}>⏱️</Text>
            <Text variant="bodySmall" style={{ marginLeft: 4 }}>
              {estado ? "Abierta ahora" : "Cerrada"}
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
  registroContainer: {
    marginBottom: 16,
  },
  registroLabel: {
    marginBottom: 8,
  },
  registroInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
  },
});