import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet, DeviceEventEmitter, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-renderer';
import { SafeAreaView } from 'react-native-safe-area-context';
import storage from '../utils/storage';

const { width, height, scale } = Dimensions.get('window')

export default class EditingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      create: this.props.route.params.create,
      note: this.props.route.params.note,
      preview: true,
      content: this.props.route.params.note.content,
      title: this.props.route.params.note.title,
    }
  }

  componentDidMount() {
    console.log('note recieved: ', this.state.note);
    console.log('preview:', this.state.preview);
  }

  // 退出编辑界面保存数据
  async componentWillUnmount() {
    console.log(this.state.create);
    let store = await storage.load({ key: 'session' })
    let name = store.sname;
    let value = store.svalue
    let user = await storage.load({ key: 'user' })

    if (this.state.content == '' && this.state.title == '') {
      return
    }

    if (!this.state.create) {
      fetch(`https://zzzzorange.icu/note?username=${user.username}&id=${this.state.note.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Cookie: name + '=' + value,
        },
        body: JSON.stringify({
          content: this.state.content,
          title: this.state.title
        })
      })
    } else {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookie: name + '=' + value, },
        body: JSON.stringify({
          content: this.state.content,
          title: this.state.title
        })
      };

      fetch(`https://zzzzorange.icu:443/note?username=${user.username}`, requestOptions)
    }
    DeviceEventEmitter.emit('flash')
  }

  render() {
    if (this.state.preview) {
      return (
        <View>
          <Top />
          <Markdown>{this.state.content}</Markdown>
        </View>
      )
    } else {
      return (
        <View
          style={{ height: height }}
        >

          <View style={{
            height: 40,
            backgroundColor: '#1E90FF',

            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexDirection: 'row',

          }}>
            <Image source={require('../assets/icon/angle-left.png')} style={{ height: 30, width: 30, marginLeft: 10 }}></Image>
            <Image source={require('../assets/icon/eye.png')} style={{ height: 30, width: 30, marginRight: 20, }}></Image>
          </View>
          <TextInput
            style={styles.title}
            textAlignVertical='top'
            multiline={false}
            numberOfLines={(height - 50) / styles.content.fontSize}
            placeholder="标题"
            defaultValue={this.state.title}
            onChangeText={text => {
              this.setState({ title: text })
            }}
          />

          <TextInput
            textAlignVertical='top'
            style={styles.content}
            multiline={true}
            numberOfLines={(height - 50) / styles.content.fontSize}
            placeholder="写一些东西"
            defaultValue={this.state.content}
            onChangeText={text => {
              this.setState({ content: text })
            }}
          />
        </View >
      )
    }
  }
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: 'white',
    fontSize: 20,
    flex: 0.05,
  },
  content: {
    fontSize: 20,
    flex: 1,
  }
})



class Top extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={{
        height: 40,
        backgroundColor: '#1E90FF',

        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',

      }}>
        <Image source={require('../assets/icon/angle-left.png')} style={{ height: 30, width: 30, marginLeft: 10 }}></Image>
        <Image source={require('../assets/icon/eye.png')} style={{ height: 30, width: 30, marginRight: 20, }}></Image>
      </View>
    )
  }
}