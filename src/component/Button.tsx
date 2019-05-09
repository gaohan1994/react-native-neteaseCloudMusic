/**
 * created by Ghan 8.24
 * 
 * Button 组件
 * 
 * Usaga:
 * 
 * import Button from 'xx/Button';
 * 
 * render() {
 *  ...
 *  <Button
 *      text="按钮"
 *      onPress={this.onPressHandle}
 *      size="small"
 *      type="ghost"
 *      color="#000000"
 *      radius={true}
 *  />
 * }
 */

import React from 'react';
import { 
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions,
    TextStyle,
    View
} from 'react-native';
import ScreenUtil, { commonStyle, UIColor } from '../common/style';

/**
 * 获取屏幕宽度来设置 Button 大小
 */
const { width: screenWidth } = Dimensions.get('window');

/**
 * @todo 根据传入的参数来设置 Button 
 * 
 * @param onPress 点击回调事件
 * 
 * @param text button 内容 必填项
 *
 * @param size default big
 *  - big 大 全屏幕宽 default
 *  - normal 中 半个屏幕宽
 *  - small 小 不设置宽度 padding 10
 * 
 * @param type default normal
 *  - ghost 空心无背景色
 *  - normal 实心有背景色
 * 
 * @param color 主题颜色
 * 
 * @param radius 是否圆角
 * 
 * @param {style} 扩展 style
 * 
 * @interface Props
 */

export type ButtonType = 'ghost' | 'normal';

export type ButtonSizeType = 'big' | 'normal' | 'small';

interface Props {
    text: string;
    onPress?: () => void;
    size?: ButtonSizeType;
    type?: ButtonType;
    color?: string;
    background?: string[] | string;
    radius?: boolean;
    style?: any;
}

class Button extends React.Component<Props, {}> {

  /**
   * @todo 根据 size 渲染 Button 大小
   *
   * @private
   * @memberof Button
   */
  static setButtonSizeStyle = (size: ButtonSizeType = 'big') => {
      switch (size) {
          case 'big':
              return styles.bigButton;
          case 'normal':
              return styles.normalButton;
          case 'small':
              return styles.smallButton;
          default:
              return styles.bigButton;
      }
  }

  render() {
      const { onPress, text, size, style } = this.props;
      return (
        <TouchableOpacity
          activeOpacity={.3}
          onPress={onPress ? onPress : () => {/* */}}
          style={[styles.shadow, style, { shadowColor: this.setButtonColors()[0] }]}
        >
          <View
            style={[
              styles.commonButton,
              Button.setButtonSizeStyle(size),
              this.setButtonTypeStyle(),
              this.setButtonRadius(),
            ]}
          >
            {/* <LinearGradient colors={this.setButtonColors()}> */}
              <Text 
                style={[
                    styles.commonText,
                    this.setTextColor(),
                    { fontSize: ScreenUtil.setSpText(15) }
                ]}
              >
                {text}
              </Text>
            {/* </LinearGradient> */}
          </View>
        </TouchableOpacity>
      );
  }

  /**
   * @todo 根据 size 渲染 Button 大小
   *
   * @private
   * @memberof Button
   */
  
  // private setButtonSizeStyle = (): ViewStyle | ViewStyle[] => {
  //     const { size = 'big' } = this.props;
  //     switch (size) {
  //         case 'big':
  //             return styles.bigButton;
  //         case 'normal':
  //             return styles.normalButton;
  //         case 'small':
  //             return styles.smallButton;
  //         default:
  //             return styles.bigButton;
  //     }
  // }

  /**
   * @todo 根据 type 渲染 Button 类型
   *
   * @private
   * @memberof Button
   */
  private setButtonTypeStyle = (): any => {
      const { type = 'normal', color } = this.props;

      switch (type) {
          case 'ghost':

              return [
                  commonStyle.dashBtn,
                  {
                      borderTopColor: color,
                      borderRightColor: color,
                      borderBottomColor: color,
                      borderLeftColor: color,
                  }
              ];
          case 'normal':
              return { };

          default:
              return { };
      }
  }

  /**
   * @todo 根据 radius 渲染 Button 是否圆角
   *
   * @private
   * @memberof Button
   */
  private setButtonRadius = (): any => {
      const { radius = true } = this.props;

      if (radius === true) {
          return styles.radius;
      } else {
          return styles.antiRadius;
      }
  }

  /**
   * @todo 根据 color 渲染 Text 颜色
   *
   * @private
   * @memberof Button
   */
  private setTextColor = (): TextStyle | TextStyle[] => {
    const { type = 'normal', color } = this.props;

    switch (type) {
      case 'ghost':
        return { color: color };

      case 'normal':
        return { color: color || '#ffffff' };

      default:
        return { color: color || '#ffffff' };
    }
  }

  private setButtonColors = (): any[] => {
    const { background } = this.props;
    
    if (!background) {
      return ['#66ABFF', '#4188F2'];
    } else if (typeof background === 'string') {
      return [background];
    } else {
      return background;
    }
  }
}

export const styles = StyleSheet.create({
  text: {
    color: UIColor.grayFont
  },

  commonButton: {
    height: ScreenUtil.autoHeight(45),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UIColor.mainColor,
  },

  commonText: {
    lineHeight: ScreenUtil.autoHeight(45),
  },

  bigButton: {
    width: screenWidth * .8
  },

  normalButton: {
    width: screenWidth * .4,
  },

  smallButton: {
    paddingLeft: ScreenUtil.autoWidth(10),
    paddingRight: ScreenUtil.autoWidth(10),
  },

  radius: {
    borderRadius: ScreenUtil.autoHeight(22),
  },

  antiRadius: {
    borderRadius: 0,
  },

  shadow: {
    // shadowColor: UIColor.mainBlue,
    shadowOffset: { width: 2, height: 2 }, 
    shadowOpacity: 0.6, 
    shadowRadius: 6, 
    elevation: 10 
  }
});

export default Button;