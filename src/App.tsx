
import React from 'react';
import {Platform, StyleSheet, View, StatusBar, Text} from 'react-native';
import RouteContainer from './route';
import { Provider } from 'react-redux';
import { configureStore } from './store/index';

export const store = configureStore();

type Props = {};
export default class App extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content"  />}
          {Platform.OS === 'android' && <StatusBar barStyle="light-content"  translucent={true} />}
          <RouteContainer />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
});
