import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator, useTheme, Button } from "react-native-paper";
import { estadoDevicesGlobal } from "../../context/contextdata";
import PuertaCard from "../../components/PuertaCard";
import BotonAddPuerta from "../../components/BotonAddPuerta";

export default function PuertasCasas() {
  const theme = useTheme();
  const [puertas, setPuertas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { ObtenerTodasPuertas, establecerEstadoPuertasDesdeLista } = useContext(estadoDevicesGlobal);

  const obtenerPuertas = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/puertas", requestOptions);
      const data = await response.json();

      if (Array.isArray(data.body)) {
        setPuertas(data.body);
        establecerEstadoPuertasDesdeLista(data.body);
        ObtenerTodasPuertas(true);
      } else {
        console.error("La propiedad 'body' no es un arreglo:", data.body);
      }
    } catch (error) {
      console.error("Error al obtener puertas:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerPuertas();
  }, []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: "#dfe6e9" }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#0984e3" }]}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Control de Accesos
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Administra tus puertas inteligentes
        </Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.mainContent}>
        {/* Estadísticas */}
        <View style={[styles.statsContainer, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.statItem}>
            <Text variant="displaySmall" style={[styles.statValue, { color: "#0984e3" }]}>
              {puertas.length}
            </Text>
            <Text variant="labelLarge">Puertas</Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="displaySmall" style={[styles.statValue, { color: "#0984e3" }]}>
              {puertas.filter(p => p.estado === "abierta").length}
            </Text>
            <Text variant="labelLarge">Abiertas</Text>
          </View>
        </View>

        {/* Acciones */}
        <View style={styles.actionsContainer}>
          <BotonAddPuerta recargarPuertas={obtenerPuertas} />
        </View>

        {/* Lista de puertas */}
        <View style={styles.puertasContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Mis Puertas
          </Text>

          {cargando ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator 
                animating={true} 
                size="large" 
                color="#0984e3"
              />
              <Text variant="bodyMedium" style={styles.loadingText}>
                Cargando puertas...
              </Text>
            </View>
          ) : puertas.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Button 
                mode="text"
                icon="door"
                textColor={theme.colors.outline}
                onPress={() => {}}
                contentStyle={{ flexDirection: 'column' }}
                labelStyle={{ fontSize: 48 }}
              >
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  No hay puertas registradas
                </Text>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  Presiona el botón para añadir tu primera puerta
                </Text>
              </Button>
            </View>
          ) : (
            puertas.map((puerta) => (
              <PuertaCard key={puerta.id} puerta={puerta} recargarPuertas={obtenerPuertas} />
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'white',
    opacity: 0.9,
  },
  mainContent: {
    padding: 16,
    marginTop: -16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
    padding: 8,
  },
  statValue: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionsContainer: {
    marginBottom: 24,
  },
  puertasContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.8,
  },
});