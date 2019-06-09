import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { GetLoginStatus } from '../store/status';
import { Stores } from '../store/index';
import { Dispatch } from 'redux';
import StatusController from '../action/StatusControll';
import ScreenUtil, {  commonStyle } from '../common/style';
import Dialog from '../component/Dialog';
import Validator from '../common/validator';
import UIImage from '../common/img';
import invariant from '../common/invariant';
import UserController from '../action/UserController';
import Button from '../component/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import NavigationService from '../NavigationService';

/**
 * 
 * @param {loginStatus} 
 * @param {dispatch} 
 * @param {sysVerificationCode} 
 * @param {userLogin} 登录函数
 * @interface LoginProps
 */
interface LoginProps { 
  loginStatus: boolean;
  dispatch: Dispatch;
}

interface LoginState {
  loginName: string;
  password: string;
}

/**
 * @todo 登录 modal
 *
 * @class Login
 * @extends {React.Component<LoginProps, LoginState>}
 */
class Login extends React.Component <LoginProps, LoginState> {

  constructor (props: LoginProps) {
    super(props);
    this.state = {
      loginName: '',
      password: '',
    };
  }

  public onCloseModal = () => {
    const { dispatch } = this.props;
    const params = { dispatch, showLogin: false };
    StatusController.changeLoginModal(params);
  }

  public changeLoginName = (text: any) => {
    this.setState({ loginName: text });
  }
  public changePassword = (text: any) => {
    this.setState({ password: text });
  }

  /**
   * @param {校验输入}
   */
  public checkAuth = () => {

    const helper = new Validator();
    helper.add(this.state.loginName, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入账号',
      elementName: 'loginName',
    }]);

    helper.add(this.state.loginName, [{
      strategy: 'isNumberVali',
      errorMsg: '请输入正确的账号格式',
      elementName: 'loginName',
    }]);

    helper.add(this.state.password, [{
      strategy: 'isNonEmpty',
      errorMsg: '请输入密码',
      elementName: 'password',
    }]);
    const result = helper.start();
    console.log('result: ', result);
    if (result) {
      return { success: false, result };
    } else {
      return { 
        success: true, 
        result: {
          phone: this.state.loginName,
          password: this.state.password
        }
      };
    }
  }

  /**
   * @param {loginHandle} 登录
   * @param {1.校验}
   * @param {2.判断type}
   * @param {3.调用接口登录}
   * @param {4.其他}
   */
  public loginHandle = async () => {
    try {
      const { success, result } = this.checkAuth();
      invariant(
        success,
        result.errMsg || ' '
      );

      const payload = { ...result };

      const { success: LoginSuccess, result: LoginResult } = await UserController.loginCellphone(payload);

      invariant(
        LoginSuccess,
        LoginResult || ' '
      );

      Dialog.success('登录成功');

      const hideParams = { dispatch: this.props.dispatch, showLogin: false };
      StatusController.changeLoginModal(hideParams);
      NavigationService.popToTop({});

    } catch (error) {
      Dialog.showToast(error.message);
    }
  }

  render () {
    const { loginStatus } = this.props;
    const inputView: ViewStyle = {
      marginTop: ScreenUtil.autoHeight(10),

    };

    return (
      <Modal 
        style={[styles.container, {flex: 1}, commonStyle.pad('t', ScreenUtil.isIphoneX() === true ? 44 : 20)]}
        isOpen={loginStatus} 
        onClosed={() => this.onCloseModal()}
        keyboardTopOffset={0}
        swipeToClose={false}
      >
        <StatusBar barStyle="dark-content"/>

        <TouchableOpacity onPress={this.onCloseModal}>
          <Image 
            style={[{marginTop: ScreenUtil.autoWidth(25), marginLeft: ScreenUtil.autoWidth(25), width: ScreenUtil.autoWidth(14), height: ScreenUtil.autoWidth(14) }]}
            source={UIImage.ic_login_close}
          />
        </TouchableOpacity>

        <ScrollView 
          style={{flex: 1}}
          contentContainerStyle={{padding: ScreenUtil.autoWidth(12), alignItems: 'center'}}
        > 
          <Input
            containerStyle={inputView}
            label="账号"
            placeholder='请输入账号'
            value={this.state.loginName}
            onChangeText={this.changeLoginName}
            leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
          />
          
          <Input
            containerStyle={inputView}
            label="密码"
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={this.changePassword}
            placeholder='请输入密码'
            leftIcon={
              <Icon
                name='lock'
                size={24}
                color='black'
              />
            }
          />

            <Button 
              onPress={() => this.loginHandle()} 
              text="登录" 
              size="big" 
              radius={true} 
              style={commonStyle.mar('t', 20)}
            />
        </ScrollView>
        
      </Modal>
    );
  }
}

export const styles: any = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

const mapStateToProps = (state: Stores) => ({
  loginStatus: GetLoginStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);