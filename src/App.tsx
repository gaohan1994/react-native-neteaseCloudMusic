
import React from 'react';
import {Platform, StyleSheet, View, StatusBar, Text} from 'react-native';
import RouteContainer from './route';
import { Provider } from 'react-redux';
import { configureStore } from './store/index';
import { ThemeProvider, Theme } from 'react-native-elements';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'

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
          <PersistGate  loading={null} persistor={persistStore(store)}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content"  />}
            {Platform.OS === 'android' && <StatusBar barStyle="light-content"  translucent={true} />}
            <ThemeProvider theme={theme} >
              <RouteContainer />
            </ThemeProvider>
          </PersistGate>
          {/* <View><Text>1</Text></View> */}
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
