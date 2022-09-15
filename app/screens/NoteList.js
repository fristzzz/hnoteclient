import React, { Component } from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View, Text,
  TouchableOpacity,

} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'

//import singleNotesView from '../components/singleNoteView'
import Top from '../components/top'


class NoteList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  // 从网站获取笔记数据
  componentDidMount() {
    fetch('https://zzzzorange.icu/note')
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          data: res.data,
        });
      })
      .catch((error) => {
        alert(error);
      });

  }

  render() {
    return (
      <SafeAreaView>
        <Top />
        <FlatList
          data={this.state.data}
          renderItem={(note) => (
            <TouchableOpacity
              style={styles.SNV}
              onPress={() => this.props.navigation.navigate('Editing', {
                note: note.item,
              })}
            >

              <Text style={styles.font}>{note.item.title}</Text>
              <Text style={styles.font}>{note.item.content}</Text>

            </TouchableOpacity>
          )} />
      </SafeAreaView >
    )
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

export default NoteList