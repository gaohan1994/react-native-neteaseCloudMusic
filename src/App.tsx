
import React from 'react';
import {Platform, StyleSheet, View, StatusBar} from 'react-native';
import RouteContainer from './route';
import { Provider } from 'react-redux';
import { configureStore } from './store/index';
import { ThemeProvider, Theme } from 'react-native-elements';

export const store = configureStore();

const theme: Theme = {
  Button: {
    raised: true
  }
}

type Props = {};
export default class App extends React.Component<Props, any> {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={store}>
          {Platform.OS === 'ios' && <StatusBar barStyle="light-content"  />}
          {Platform.OS === 'android' && <StatusBar barStyle="light-content"  translucent={true} />}
          <ThemeProvider theme={theme} >
            <RouteContainer />
          </ThemeProvider>
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
