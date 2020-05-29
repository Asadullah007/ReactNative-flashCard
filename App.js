import React from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import TabNav from './src/components/TabNav';
import StackNav from './src/components/StackNav';
import { Home } from './src/components/Home';
import DeckList from './src/components/DeckList';
import { KeyboardAvoidingViewBase, KeyboardAvoidingView } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';

export default class App extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync( {
      Roboto: require( 'native-base/Fonts/Roboto.ttf' ),
      Roboto_medium: require( 'native-base/Fonts/Roboto_medium.ttf' ),
      ...Ionicons.font,
    } );
    this.setState( { isReady: true } );
  }

  render() {
    if ( !this.state.isReady ) {
      return <AppLoading />;
    }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <Provider store={store}>
          <Container >
            <Home />
          </Container>
        </Provider>
      </KeyboardAvoidingView>
    );
  }
}
