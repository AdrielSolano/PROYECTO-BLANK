import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, ActivityIndicator, useTheme, Button } from "react-native-paper";
import { estadoDevicesGlobal } from "../../context/contextdata";
import LuzCard from "../../components/LuzCard"; // ✅
import BotonAddLight from "../../components/BotonAddLight";

export default function LucesCasas() {
  const theme = useTheme();
  const [luces, setLuces] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { ObtenerTodasLuces } = useContext(estadoDevicesGlobal);


  const obtenerLuces = async () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    try {
      const response = await fetch("http://192.168.137.1:5000/api/luces", requestOptions);
      const data = await response.json();

      if (Array.isArray(data.body)) {
        setLuces(data.body);
        ObtenerTodasLuces(true);
      } else {
        console.error("La propiedad 'body' no es un arreglo:", data.body);
      }
    } catch (error) {
      console.error("Error al obtener luces:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerLuces();
  }, []);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: "#dfe6e9" }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: "#0984e3" }]}>
        <Text variant="headlineMedium" style={styles.headerTitle}>
          Control de Iluminación
        </Text>
        <Text variant="bodyMedium" style={styles.headerSubtitle}>
          Administra tus dispositivos inteligentes
        </Text>
      </View>

      {/* Contenido principal */}
      <View style={styles.mainContent}>
        {/* Estadísticas */}
          <View style={[styles.statsContainer, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.statItem}>
              <Text variant="displaySmall" style={[styles.statValue, { color: "#0984e3" }]}>
                {luces.length}
              </Text>
              <Text variant="labelLarge">Dispositivos</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="displaySmall" style={[styles.statValue, { color: "#0984e3" }]}>
                {luces.filter(l => l.estado === true).length}
              </Text>
              <Text variant="labelLarge">Encendidos</Text>
            </View>
          </View>

          {/* Acciones */}
        <View style={styles.actionsContainer}>
          <BotonAddLight recargarLuces={obtenerLuces} />
        </View>

        {/* Lista de luces */}
        <View style={styles.lightsContainer}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Mis Dispositivos
          </Text>

          {cargando ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator 
                animating={true} 
                size="large" 
                color="#0984e3"
              />
              <Text variant="bodyMedium" style={styles.loadingText}>
                Cargando dispositivos...
              </Text>
            </View>
          ) : luces.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Button 
                mode="text"
                icon="lightbulb-off"
                textColor={theme.colors.outline}
                onPress={() => {}}
                contentStyle={{ flexDirection: 'column' }}
                labelStyle={{ fontSize: 48 }}
              >
                <Text variant="titleMedium" style={styles.emptyTitle}>
                  No hay dispositivos
                </Text>
                <Text variant="bodyMedium" style={styles.emptyText}>
                  Presiona el botón para añadir tu primer dispositivo
                </Text>
              </Button>
            </View>
          ) : (
            luces.map((luz) => (
              <LuzCard key={luz.id} luz={luz} recargarLuces={obtenerLuces} />
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
  lightsContainer: {
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