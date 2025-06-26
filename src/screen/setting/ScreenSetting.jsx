import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonLogout from '../../components/ButtonLogout';

export default function ScreenSetting() {
  return (
    <View style={{ flex: 1, backgroundColor: '#dfe6e9' }}>
      <ButtonLogout />
    </View>
  )
}

const styles = StyleSheet.create({})