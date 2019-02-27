import { Alert } from 'react-native';
import Toast, { ShowOptions } from 'react-native-root-toast';
import ScreenUtil from '../common/style';

class Dialog {

  /**
   * 显示 Toast 
   * 
   * @param message toast 信息
   * @param options Toast 配置项
   *
   * @static
   * @memberof Dialog
   */
  static showToast = (message: string, options?: ShowOptions): void => {
    Toast.show(message, options || { position: ScreenUtil.autoHeight(ScreenUtil.uiHeight / 2) - 30 });
  }

  /**
   * alert 信息 confirm 两个按钮 确定和取消 确定有回调
   * 
   * @param message 显示信息
   * @param callback 确定回调
   * 
   * @static
   * @memberof Dialog
   */
  static confirm = (message: string, callback: () => void) => {
    Alert.alert(
      '',
      message,
      [
        { 
          text: '取消'
        },
        { 
          text: '确定',
          onPress: callback
        }
      ]
    );
  }

  /**
   * @param message 显示信息
   *
   * @static
   * @memberof Dialog
   */
  static alert = (message: string) => {
    Alert.alert(
      '',
      message,
      [
        { text: '确定' }
      ],
      {
        cancelable: true
      }
    );
  }
}

export default Dialog;