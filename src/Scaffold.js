import React from 'react'
import { View, StyleSheet } from 'react-native'
import Toast from './Toast'
import Snackbar from './Snackbar'

export default class Scaffold extends React.Component {
  render() {
    const { children } = this.props
    return <View style={styles.container}>
      {children}
      <Snackbar/>
      <Toast />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})