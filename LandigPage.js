import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated, AlertIOS, FlatList, List, ListItem, Text } from 'react-native';
import moment from 'moment';
import StickyHeaderFooterScrollView from 'react-native-sticky-header-footer-scroll-view';

class LandingPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      alertWord: '',
      wordList: ['Bob', 'chicken', 'little'],
      loading: false
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  componentWillMount() {
    this.setState({ loading: true })
  }

  add = (alertWord) => {
    let notEmpty = alertWord.trim().length > 0
    if (notEmpty) {
      this.setState(
        prevState => {
          let { wordList } = prevState
          return {
            wordList: wordList.concat(alertWord),
            alertWord: ''
          }
        })
    }
  }

  remove = (i) => {
    this.setState(
      prevState => {
        let wordList = prevState.wordList.slice()
          wordList.splice(i, 1)
          return { wordList }
      })
  }

  showForm = () => {
      AlertIOS.prompt(
        'Enter word for ExtraEar to listen for...',
        null,
        alertWord => this.add(alertWord)
        )
  }

  render() {
    return (
        <StickyHeaderFooterScrollView
          renderStickyHeader={() => (
            <View>
              <Text>ExtraEar</Text>
            </View>
          )}
          renderStickyFooter={() => (
            <View>
              <Text>Add Button</Text>
            </View>
          )}
        >
        <View>
         <List>
          <FlatList
            data={this.state.wordList}
            renderItem={({ item }) => (
             <ListItem
              title={`${item}`}
             />
            )}
            keyExtractor={item => item.wordList}
          />
         </List>
        </View>
       </StickyHeaderFooterScrollView>
    )
  }
}

export default LandingPage;
