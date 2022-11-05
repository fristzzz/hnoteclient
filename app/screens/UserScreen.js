import React, { Component } from 'react'
import { Button, Text, View, StyleSheet, Image } from 'react-native'
import storage from '../utils/storage'
import LoginScreen from './Login'
import UserHome from './UserHome'

class UserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }



  render() {
    return (
      <View style={styles.Container}>
        <Button
          onPress={() => {
            this.props.navigation.navigate('Login')
          }}
          title={"登录"}
        ></Button>
        <Button
          onPress={() => {
            this.props.navigation.navigate('register')
          }}
          title={"注册"}
        ></Button>


      </View>
    )
  }

  check($event) {
    storage.load({
      key: 'user'
    })
      .then(ret => {
        console.log(ret.username);
        console.log(ret.password);
      })
  }

  check

}

export default UserScreen

const styles = StyleSheet.create({
  Container: {

  }
})