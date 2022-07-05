import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EditingScreen from '../screens/EditingScreen';

import storage from '../utils/storage';

export default function singleNotesView(note) {


  console.log(note);
  return (
    // <View style={styles.SNV}>
    //   <Text style={styles.font}>{note.item.title}</Text>
    //   <Text style={styles.font}>{note.item.content}</Text>
    // </View>

    <TouchableOpacity
      style={styles.SNV}
    >
      <Text style={styles.font}>{note.item.title}</Text>
      <Text style={styles.font}>{note.item.content}</Text>
    </TouchableOpacity>
  );
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

