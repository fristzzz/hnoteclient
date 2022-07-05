import React, { Component } from 'react'
import { SafeAreaView, FlatList } from 'react-native'
import singleNotesView from '../components/singleNoteView'


class NoteScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    fetch('https://zzzzorange.icu/note')
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
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
        <FlatList
          data={this.state.data}
          renderItem={singleNotesView} />
      </SafeAreaView >
    )
  }


}

export default NoteScreen