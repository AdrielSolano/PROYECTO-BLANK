import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { Button, Card, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { estadoGlobal } from '../../context/contextdata';


export default function ScreenHome() {
  const rutas = useNavigation();
  const { contador, sumar, restar } = useContext(estadoGlobal);
  console.log(contador);

  return (
    <View style={{ flex: 1, backgroundColor: '#dfe6e9', padding: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Card style={{ flex: 1, margin: 5, padding: 5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon source="lightbulb-on-outline" color="#0984e3" size={70}/>
          </View>
          <Button icon="arrow-right-thin" mode="contained" onPress={() => rutas.push("LucesCasa")}
            style={{
              marginBottom: 8,
              backgroundColor: '#0984e3',
              color: 'white',
              fontSize: 14,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 30,
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginTop: 8
            }}>
            Ver Opcion
          </Button>
        </Card>
        <Card style={{ flex: 1, margin: 5, padding: 5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon source="door" color="#0984e3" size={70} />
          </View>
          <Button icon="arrow-right-thin" mode="contained" onPress={() => rutas.push("PuertasCasa")}
            style={{
              marginTop: 8,
              backgroundColor: '#0984e3',
              color: 'white',
              fontSize: 14,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 30,
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            Ver Opcion
          </Button>
        </Card>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
        <Card style={{ flex: 1, margin: 5, padding: 5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon source="car-outline" color="#0984e3" size={70} />
          </View>
          <Button icon="arrow-right-thin" mode="contained" onPress={() => rutas.push("PuertasCasa")}
            style={{
              marginTop: 8,
              backgroundColor: '#0984e3',
              color: 'white',
              fontSize: 14,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 30,
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            Ver Opcion
          </Button>
        </Card>
        <Card style={{ flex: 1, margin: 5, padding: 5 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Icon source="fan" color="#0984e3" size={70} />
          </View>
          <Button icon="arrow-right-thin" mode="contained" onPress={() => rutas.push("PuertasCasa")}
            style={{
              marginTop: 8,
              backgroundColor: '#0984e3',
              color: 'white',
              fontSize: 14,
              paddingVertical: 4,
              paddingHorizontal: 8,
              borderRadius: 30,
              textAlign: 'center',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              marginBottom: 8,
            }}>
            Ver Opcion
          </Button>
        </Card>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})