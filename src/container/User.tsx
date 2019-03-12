import React from 'react';
import { Text, View } from 'react-native';
import UserController from '../action/UserController';
import { AbstractParams } from 'src/action/actions';

export default class User extends React.Component {

  componentDidMount() {
    const params: AbstractParams<any> = {
      param: {
        phone: '15659995443',
        password: 'gaohan123',
      }
    };
    UserController.login(params);
  }

  render() {
    return (
      <View>
        <Text> User </Text>
      </View>
    )
  }
}
