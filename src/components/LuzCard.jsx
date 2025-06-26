import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Card, IconButton, Text, Switch, Slider, useTheme, TextInput } from "react-native-paper";
import { estadoDevicesGlobal } from '../context/StateDispositivos';

export default function LuzCard(props) {
    const context = useContext(estadoDevicesGlobal);
console.log('Context value:', context);  // Should show your context object

if (!context) {
  console.error('Context is missing! Check provider wrapping');
  return null;
}

const { cambiarEstadoLuz, obtenerEstadoLuz } = context;

    const theme = useTheme();
    const [nombre, setNombre] = useState(props.luz.nombre || "");
    const [intensidad, setIntensidad] = useState(props.luz.intensidad || 0);
    const [modoEditarNombre, setModoEditarNombre] = useState(false);
    const [nombreTemp, setNombreTemp] = useState(nombre);

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
                                mode="outlined"
                                value={nombreTemp}
                                onChangeText={setNombreTemp}
                                style={[styles.input, { backgroundColor: theme.colors.surface }]}
                                placeholder="Nombre de la luz"
                                autoFocus
                            />
                            <View style={styles.editButtons}>
                                <IconButton
                                    icon="check"
                                    size={20}
                                    onPress={guardarNombre}
                                    iconColor={theme.colors.primary}
                                />
                                <IconButton
                                    icon="close"
                                    size={20}
                                    onPress={() => setModoEditarNombre(false)}
                                    iconColor={theme.colors.error}
                                />
                            </View>
                        </View>
                    ) : (
                        <View style={styles.titleContainer}>
                            <Text
                                variant="titleMedium"
                                style={[styles.title, { color: theme.colors.primary }]}
                                onPress={() => setModoEditarNombre(true)}
                            >
                                {nombre || "Nueva luz"}
                            </Text>
                            <IconButton
                                icon="delete"
                                size={20}
                                onPress={eliminarLuz}
                                iconColor={theme.colors.error}
                            />
                        </View>
                    )}
                </View>

                {/* Estado */}
                <View style={styles.statusRow}>
                    <View style={styles.statusInfo}>
                        <IconButton
                            icon={estado ? "lightbulb-on" : "lightbulb-off"}
                            iconColor={estado ? theme.colors.primary : theme.colors.outline}
                            size={24}
                        />
                        <Text variant="bodyMedium">
                            {estado ? "Encendida" : "Apagada"}
                        </Text>
                    </View>
                    <Switch
                        value={estado}
                        onValueChange={actualizarEstado}
                        color={theme.colors.primary}
                    />
                </View>

                {/* Intensidad */}
                <View style={styles.intensityContainer}>
                    <Text variant="labelLarge" style={styles.intensityLabel}>
                        Intensidad: {intensidad}%
                    </Text>
                    <Slider
                        value={intensidad}
                        onValueChange={actualizarIntensidad}
                        minimumValue={0}
                        maximumValue={100}
                        step={5}
                        disabled={!estado}
                        thumbTintColor={estado ? theme.colors.primary : theme.colors.outline}
                        style={styles.slider}
                    />
                    <View style={styles.sliderMarks}>
                        <Text variant="labelSmall">0%</Text>
                        <Text variant="labelSmall">50%</Text>
                        <Text variant="labelSmall">100%</Text>
                    </View>
                </View>

                {/* Consumo */}
                <View style={styles.consumptionContainer}>
                    <View style={styles.consumptionItem}>
                        <IconButton
                            icon="flash"
                            size={20}
                            iconColor={theme.colors.secondary}
                        />
                        <Text variant="bodySmall">
                            Consumo: {estado ? `${Math.round(intensidad * 0.1)}W` : "0W"}
                        </Text>
                    </View>
                    <View style={styles.consumptionItem}>
                        <IconButton
                            icon="timer"
                            size={20}
                            iconColor={theme.colors.secondary}
                        />
                        <Text variant="bodySmall">
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        fontWeight: '600',
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
    },
    editButtons: {
        flexDirection: 'row',
    },
    statusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statusInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    intensityContainer: {
        marginBottom: 16,
    },
    intensityLabel: {
        marginBottom: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
    sliderMarks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -8,
    },
    consumptionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    consumptionItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});