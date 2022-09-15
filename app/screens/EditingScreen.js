import React, { Component } from 'react'
import { Text, View, Dimensions, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import Markdown from 'react-native-markdown-renderer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Top from '../components/top';


const { width, height, scale } = Dimensions.get('window')

export default class EditingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: this.props.route.params.note,
      preview: false,
      content: this.props.route.params.note.content,
    }
  }

  componentDidMount() {
    console.log(this.state.note);
    console.log(this.state.preview);
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
          <Top />
          <TextInput
            textAlignVertical='top'
            style={[styles.font, {
              flex: 1,
              backgroundColor: '#4ff',
            }]}
            multiline={true}
            numberOfLines={(height - 50) / styles.font.fontSize}
            placeholder="有点子？"
            defaultValue={this.state.note.content}
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
  font: {
    fontSize: 20
  }
})