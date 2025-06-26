import React, { createContext, useState } from "react";

// Crea el contexto
export const estadoDevicesGlobal = createContext();

export default function StateDispositivos({ children }) {
  // ----------------------------- Estados Globales -----------------------------
  const [isDeviceOn, setIsDeviceOn] = useState({});
  const [estadoLuces, setEstadoLuces] = useState({});
  const [estadoPuertas, setEstadoPuertas] = useState({});

  // ----------------------------- Luces -----------------------------
  const cambiarEstadoLuz = (id) => {
    setEstadoLuces((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log(`Luz ${id} ahora está: ${!estadoLuces[id] ? "encendida" : "apagada"}`);
  };

  const obtenerEstadoLuz = (id) => {
    return estadoLuces[id] || false;
  };

  const ObtenerTodasLuces = (estado) => {
    setIsDeviceOn(estado);
    console.log("Estado de registro luces:", estado ? "Todas las luces obtenidas" : "No hay registros de luces");
  };

  // ----------------------------- Puertas -----------------------------
  const cambiarEstadoPuerta = (id) => {
    setEstadoPuertas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    console.log(`Puerta ${id} ahora está: ${!estadoPuertas[id] ? "abierta" : "cerrada"}`);
  };

  const obtenerEstadoPuerta = (id) => {
    return estadoPuertas[id] || false;
  };

  const establecerEstadoPuertasDesdeLista = (listaPuertas) => {
    const nuevosEstados = {};
    listaPuertas.forEach((puerta) => {
      nuevosEstados[puerta.id] = puerta.estado === "abierta";
    });
    setEstadoPuertas(nuevosEstados);
    console.log("Estados de puertas establecidos desde lista:", nuevosEstados);
  };

  const ObtenerTodasPuertas = (estado) => {
    setIsDeviceOn(estado);
    console.log("Estado de registro puertas:", estado ? "Todas las puertas obtenidas" : "No hay registros de puertas");
  };

  // ----------------------------- Proveedor Global -----------------------------
  return (
    <estadoDevicesGlobal.Provider
      value={{
        isDeviceOn,
        estadoLuces,
        estadoPuertas,
        cambiarEstadoLuz,
        obtenerEstadoLuz,
        ObtenerTodasLuces,
        cambiarEstadoPuerta,
        obtenerEstadoPuerta,
        establecerEstadoPuertasDesdeLista,
        ObtenerTodasPuertas,
      }}
    >
      {children}
    </estadoDevicesGlobal.Provider>
  );
}