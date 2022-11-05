import React, { Component } from 'react'
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View, Text,
  TouchableOpacity,

} from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { DeviceEventEmitter, Button, } from 'react-native'
import storage from '../utils/storage'
import host from '../utils/hostdomin'

import Top from '../components/top'

class NoteList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
      username: '',
      password: '',
      flash: false,
    }

    this.deleteNote = this.deleteNote.bind(this)
  }

  // 从网站获取笔记数据
  async componentDidMount() {
    let ret = await storage.load({
      key: 'user',
      autoSync: false,
    })
    let url = `https://zzzzorange.icu/note?username=${ret.username}`
    let response = await fetch(url, {
      method: 'GET',
    })
    response = await response.json()
    this.setState({
      data: response.data,
    })

    await DeviceEventEmitter.addListener('flash', () => {
      this.setState({ flash: true })
    })
  }

  setTimePassed() {
    this.setState({ timePassed: true });
  }

  async componentDidUpdate() {
    if (this.state.flash) {

      let ret = await storage.load({
        key: 'user',
        autoSync: false,
      })
      let url = `https://zzzzorange.icu/note?username=${ret.username}`
      let response = await fetch(url, {
        method: 'GET',
      })
      response = await response.json()
      this.setState({
        data: response.data,
        flash: false,
      })
      this.setState({ flash: false })
      await DeviceEventEmitter.addListener('flush', () => {

        setTimeout(() => {
          this.setState({ flash: true })
        }, 500);
      })
    }
  }

  render() {
    return (
      <SafeAreaView>
        {/* <Top /> */}
        <Button
          title={"添加便签"}
          onPress={() => this.props.navigation.navigate('Editing', {
            create: true,
            note: {
              content: '',
              title: '',
            },
          })}
        />

        <FlatList
          data={this.state.data}
          renderItem={(note) => (
            <TouchableOpacity
              style={styles.SNV}
              onPress={() => this.props.navigation.navigate('Editing', {
                note: note.item,
                create: false,
              })}
            >

              <View style={styles.textView}>
                <Text style={styles.font}>{note.item.title}</Text>
                <Text style={styles.font}>{note.item.content}</Text>
              </View>
              <Button
                title={"删除"}
                onPress={(e) => {
                  this.deleteNote(e, note)
                  this.setState({ flash: true })
                }

                }
              />

            </TouchableOpacity>
          )} />
      </SafeAreaView >
    )
  }

  async deleteNote(e, note) {
    console.log(note);
    let store = await storage.load({ key: 'session' })
    let name = store.sname;
    let value = store.svalue
    let user = await storage.load({ key: 'user' })

    const requestOptions = {
      method: 'DELETE',
      headers: { Cookie: name + '=' + value, },
    };
    fetch(`https://zzzzorange.icu/note?id=${note.item.id}&username=${user.username}`, requestOptions)
    DeviceEventEmitter.emit('flush')
  }
}

const styles = StyleSheet.create({
  SNV: {
    height: 60,
    padding: 3,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  font: {
    fontSize: 20,
  },
  textView: {
    flex: 1
  }
});

export default NoteList