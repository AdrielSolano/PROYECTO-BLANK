import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button, Card, Icon } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';


export default function ScreenHome() {
    const rutas = useNavigation();

  return (
    <View style={{ padding: 10 }}>
      <Card style={{ padding: 5, marginTop: 10 }}>
        <Icon source="a" color="blue" size={70} />
        <Button icon="arrow-right-thin" mode="contained" onPress={()=>rutas.push("LucesCasa")}
          style={{
            marginBottom:10, backgroundColor: 'blue', color: 'white', fontSize: 20, padding: 10,
            borderRadius: 5, textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold',
            marginTop: 10
          }}>
          Ver Opcion
        </Button>
      </Card>
            <Card style={{ padding: 5, marginTop: 10 }}>
        <Icon source="door" color="black" size={70} />
        <Button icon="arrow-right-thin" mode="contained" onPress={()=>rutas.push("PuertasCasa")}
          style={{
            marginTop: 10, backgroundColor: 'black',
            color: 'white', fontSize: 20, padding: 10,
            borderRadius: 5, textAlign: 'center',
            textTransform: 'uppercase', fontWeight: 'bold',
            marginBottom: 10,
          }}>
          Ver Opcion
        </Button>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({})