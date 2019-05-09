import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Animated,
  TextInputProps,
} from 'react-native';
import ScreenUtil, { commonStyle, UIColor } from '../common/style';

interface InputWithIconProps extends TextInputProps { 
  icon?: string;
  value: string;
  keyboardType?: any;
  style?: any;
  onChangeText: (param?: any) => void;
  renderRight?: JSX.Element;
}

interface InputWithIconState { }

const ORIGINAL_COLOR = UIColor.grayBorder;
const SUCCESS_COLOR = UIColor.mainColor;

const ORIGINAL_VALUE = 0;
const SUCCESS_VALUE = 1;
class InputWithIcon extends React.Component<InputWithIconProps, InputWithIconState> {

  private borderColor: any;

  constructor (props: InputWithIconProps) {
    super(props);
    this.borderColor = new Animated.Value(ORIGINAL_VALUE);
  }

  public onFocusHandle = () => {
    Animated.timing(this.borderColor, {
      duration: 400,
      toValue: SUCCESS_VALUE
    }).start();
  }

  public onBlurHandle = () => {
    Animated.timing(this.borderColor, {
      duration: 400,
      toValue: ORIGINAL_VALUE
    }).start();
  }

  public onChangeText = (text: string) => {
    const { onChangeText } = this.props;
    onChangeText(text);
  }

  render() {
    const { icon, value, style={}, renderRight } = this.props;
    const borderBottomColor = this.borderColor.interpolate({ 
      inputRange: [ORIGINAL_VALUE, SUCCESS_VALUE], 
      outputRange: [ORIGINAL_COLOR, SUCCESS_COLOR] 
    });

    return (
      <Animated.View 
        style={[
          styles.inputBox,
          commonStyle.pad('t', 10),
          commonStyle.pad('b', 10),
          {
            borderBottomWidth: ScreenUtil.autoHeight(1),
            borderBottomColor: borderBottomColor
          },
          style
        ]}
      >
        {
          icon ? (
            <Image
              style={[{ width: ScreenUtil.autoWidth(16), height: ScreenUtil.autoWidth(16) }]} 
              source={{ uri: icon }}
            />
          ) : null
        }
        <TextInput
          {...this.props}
          value={value}
          autoCorrect={false}
          onFocus={() => this.onFocusHandle()}
          onBlur={() => this.onBlurHandle()}
          onChangeText={this.onChangeText}
          style={[
            commonStyle.mar('l', icon ? 10 : 0),
            { 
              
              // height: ScreenUtil.autoHeight(30), 
              width: ScreenUtil.autoWidth(
                icon 
                ? 220
                : renderRight 
                  ? 160
                  : 300
              ), 
              fontSize: ScreenUtil.setSpText(15)
            }
          ]}
        />
        
        {
          renderRight 
          ? <View style={{position: 'absolute', right: 0}}>{renderRight}</View> 
          : null
        }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: ScreenUtil.autoWidth(300),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default InputWithIcon;
