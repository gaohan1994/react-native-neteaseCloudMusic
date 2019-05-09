import React from 'react';
import { Text, View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import { HeaderLeft } from '../component/Header';
import InputWithIcon from '../component/TextWithIcon';
import { HandleErrorResult } from '../common/validator';
import Button from '../component/Button';
import Validator from '../common/validator';
import Dialog from '../component/Dialog';
import invariant from '../common/invariant';
import UserController from '../action/UserController';

type Props = {

}
type State = {
  loginName: string;
  userName: string;
  password: string;
  checkPassword: string;
  captcha: string;
}

/**
 * 注册页面
 *
 * @export
 * @class Register
 * @extends {Component}
 */
class Register extends React.Component<Props, State> {

  static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<any> }) => {
    return {
      headerLeft: <HeaderLeft navigation={navigation} color="#000000"/>,
    };
  };

  state = {
    loginName: '',
    userName: '',
    password: '',
    checkPassword: '',
    captcha: '',
  }

  public changeLoginName = (text: string) => {
    this.setState({ loginName: text });
  }
  public changeUserName = (text: string) => {
    this.setState({ userName: text });
  }
  public changePassword = (text: string) => {
    this.setState({ password: text });
  }
  public changeCheckPassword = (text: string) => {
    this.setState({ checkPassword: text });
  }

  public checkAuth = () => {
    const helper = new Validator();
    
    helper.add(this.state.loginName, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入手机号',
      elementName: 'loginName',
    }]);

    helper.add(this.state.userName, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入昵称',
      elementName: 'userName',
    }]);

    helper.add(this.state.password, [{
      strategy: 'isNumberVali',
      errorMsg: '请输入正确的手机号格式',
      elementName: 'password',
    }]);

    helper.add(this.state.password, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入密码',
      elementName: 'password',
    }]);

    helper.add(this.state.checkPassword, [{
      strategy: 'isNonEmpty',
      errorMsg: '密码输入不一致',
      elementName: 'checkPassword',
    }]);

    helper.add(this.state.captcha, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入验证码',
      elementName: 'captcha',
    }]);

    helper.add([this.state.password, this.state.checkPassword], [{
      strategy: 'isEqual',
      errorMsg: '密码输入不一致',
      elementName: '',
    }]);
    const result = helper.start();

    if (result) {
      return { success: false, result };
    } else {
      return { 
        success: true, 
        result: {
          nickname: this.state.userName,
          password: this.state.password,
          phone: this.state.loginName,
          captcha: this.state.captcha,
        } 
      };
    }
  }

  public login = async () => {
    const { success, result } = this.checkAuth();
    try {
      invariant(
        success === true,
        result.errMsg || ''
      );

      const payload = { ...result };
      console.log('payload: ', payload);
      
      UserController.captchRegister(payload);
      // const { success: AddSuccess, result: AddResult } = await UserController.captchRegister(payload);

      // invariant(
      //   AddSuccess,
      //   `${AddResult}`
      // );
      
      // Dialog.success('注册成功');
      // /**
      //  * 成功之后直接登录
      //  */
      // const loginPayload = {
      //   username: payload.userName,
      //   password: payload.password,
      //   rememberMe: false
      // };

      // const { } = await UserController.login(loginPayload);
    } catch (error) {
      Dialog.showToast(error.message);
    }
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <ScrollView 
          style={styles.container}
          contentContainerStyle={{paddingBottom: ScreenUtil.isIphoneX() === true ? 40 : 20}}
        >
          <View style={styles.subContainer}>
            {/* title */}
            <View style={[styles.codeTitle, commonStyle.pad('l', 25)]}>
              <Text 
                style={[
                  commonStyle.mar('l', 10), commonStyle.bor('b', 2, UIColor.mainColor), 
                  { fontSize: ScreenUtil.setSpText(22), color: UIColor.titleBlack}]}
              >
                注册账号
              </Text>
            </View>

            
            <View style={[styles.inputBox, commonStyle.mar('t', 20), commonStyle.pad('t', 10), commonStyle.pad('b', 10)]}>
              <Text style={{fontSize: ScreenUtil.setSpText(13), color: UIColor.inputFont}}>账号</Text>
              <InputWithIcon
                value={this.state.loginName}
                placeholder="请输入手机号"
                onChangeText={(text: any) => this.changeLoginName(text)}
              />
            </View>

            <View style={[styles.inputBox, commonStyle.mar('t', 20), commonStyle.pad('t', 10), commonStyle.pad('b', 10)]}>
              <Text style={{fontSize: ScreenUtil.setSpText(13), color: UIColor.inputFont}}>昵称</Text>
              <InputWithIcon
                value={this.state.userName}
                placeholder="请输入昵称"
                onChangeText={(text: any) => this.changeUserName(text)}
              />
            </View>

            <View style={[styles.inputBox, commonStyle.mar('t', 20), commonStyle.pad('t', 10), commonStyle.pad('b', 10)]}>
              <Text style={{fontSize: ScreenUtil.setSpText(13), color: UIColor.inputFont}}>密码</Text>
              <InputWithIcon
                value={this.state.password}
                placeholder="6位以上数字与英文结合"
                secureTextEntry={true}
                onChangeText={(text: any) => this.changePassword(text)}
              />
            </View>

            <View style={[styles.inputBox, commonStyle.mar('t', 20), commonStyle.pad('t', 10), commonStyle.pad('b', 10)]}>
              <Text style={{fontSize: ScreenUtil.setSpText(13), color: UIColor.inputFont}}>确认密码</Text>
              <InputWithIcon
                value={this.state.checkPassword}
                placeholder="再次输入密码"
                secureTextEntry={true}
                onChangeText={(text: any) => this.changeCheckPassword(text)}
              />
            </View>
            
            <Button 
              onPress={() => this.login()} 
              text="下一步" 
              size="big" 
              radius={true} 
              style={commonStyle.mar('t', 20)}
            />
          </View>
          
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    marginTop: ScreenUtil.autoWidth(25),
    marginLeft: ScreenUtil.autoWidth(25),
  },
  subContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeTitle: {
    marginTop: ScreenUtil.autoHeight(10),
    width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputBox: {
    width: ScreenUtil.autoWidth(300),
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default Register;
