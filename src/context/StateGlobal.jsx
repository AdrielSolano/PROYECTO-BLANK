import { View, Text } from 'react-native'
import React, {Children, useState} from 'react'
import { estadoGlobal } from './contextdata';

export default function StateGlobal({children }) {
  // Este componente es el proveedor del contexto global

    // Aquí puedes definir el estado global y las funciones que lo modifican
    const [contador, setContador] = useState(0);
    // Ejemplo de funciones para modificar el estado
    const sumar = () => {
        setContador(contador + 1);
    }; 
    const restar = () => {
        setContador(contador - 1);
    };

  return (
    <estadoGlobal.Provider value={{contador, sumar, restar}}>
        {children}
    </estadoGlobal.Provider>
  )
}