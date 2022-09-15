///此文件已废弃. 9/14

import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EditingScreen from '../screens/EditingScreen';

import storage from '../utils/storage';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Component } from 'react';

//笔记列表中的一个笔记
export default class singleNotesView extends Component {
  constructor(props) {
    super(props)
  }


  render() {

    < TouchableHighlight
      style={styles.SNV}
      onPress={() => this.props.navigation.navigate('Editing')}
    >
      <Text style={styles.font}>{note.item.title}</Text>
      <Text style={styles.font}>{note.item.content}</Text>
    </TouchableHighlight >
  }
}


const styles = StyleSheet.create({
  SNV: {
    height: 70,
    padding: 3,
    paddingLeft: 10,
  },
  font: {
    fontSize: 20,
  },
});

