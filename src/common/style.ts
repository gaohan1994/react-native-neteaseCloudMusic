/**
 * @param { created by Ghan 2018.11.5 }
 */
import {Dimensions, Platform, PixelRatio } from 'react-native';
// import numeral from 'numeral';
const { width, height } = Dimensions.get('window');

/**
 * @todo 全局 Screen Helper
 *
 * @class ScreenUtil
 */
class ScreenUtil {

  /**
   * @param {uiWidth} 设计图的宽度
   * @param {uiHeight} 设计图的高度
   */
  public uiWidth: number = 375;
  public uiHeight: number = 667;
  /**
   * @param {X_WIDTH} iphoneX width
   * @param {X_HEIGHT} iphoneX height
   */
  public X_WIDTH: number = 375;
  public X_HEIGHT: number = 812;

  /**
   * @param {screenWidth} 设备屏幕宽度
   * @param {screenHeith} 设备屏幕高度
   */
  public screenWidth: number = Dimensions.get('window').width;
  public screenHeith: number = Dimensions.get('window').height;

  /**
   * @param {widthRadio} 宽度适配
   * @param {heightRadio} 高度适配
   */
  public scale: number = Math.min(Dimensions.get('window').height / this.uiHeight, Dimensions.get('window').width / this.uiWidth);
  public widthRadio: number = Dimensions.get('window').width / this.uiWidth;
  public heightRadio: number = Dimensions.get('window').height / this.uiHeight;

  /**
   * @param {widthRadio} iphoneX宽度适配
   * @param {heightRadio} iphoneX高度适配
   */
  public scaleIPX: number = Math.min(Dimensions.get('window').height / this.X_HEIGHT, Dimensions.get('window').width / this.X_WIDTH);
  public widthRadioIPX: number = Dimensions.get('window').width / this.X_WIDTH;
  public heightRadioIPX: number = Dimensions.get('window').height / this.X_HEIGHT;

  public pixel: number = 1 / PixelRatio.get();
  public pixelRatio: number = PixelRatio.get();
  public fontScale: number = PixelRatio.getFontScale();
  
  /**
   * @todo 宽度适配，例如我的设计稿某个样式宽度是50pt，那么使用就是：ScreenUtil.autowidth(50)
   */
  public autoWidth = (value: number) => {
    return (this.isIphoneX() ? this.widthRadioIPX : this.widthRadio) * value;
  }

  /**
   * @todo 高度适配，例如我的设计稿某个样式高度是50pt，那么使用就是：ScreenUtil.autoheight(50)
   */
  public autoHeight = (value: number) => {
    return (this.isIphoneX() ? this.heightRadioIPX : this.heightRadio) * value;
  }

  /*字体大小适配，例如我的设计稿字体大小是17pt，那么使用就是：ScreenUtil.setSpText(17)*/
  public setSpText = (number: number) => {
    number = Math.round((number * (this.isIphoneX() ? this.scaleIPX : this.scale) + 0.5) * this.pixelRatio / this.fontScale);
    return number / PixelRatio.get();
  }

  /**
   * @todo check current device is iphonex
   *
   * @static
   * @memberof ScreenUtil
   */
  // public isIphoneX = (): boolean => {
  //   if (Platform.OS === 'web') {
  //     return false;
  //   }

  //   if (
  //     Platform.OS === 'ios' && 
  //     ((this.screenHeith === this.X_HEIGHT && this.screenWidth === this.X_WIDTH) ||
  //     (this.screenHeith === this.X_WIDTH && this.screenWidth === this.X_HEIGHT))
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  
  //目前iPhone X序列手机的适配算法：高宽比先转换为字符串，截取前三位，转换为number类型 再乘以100
  public isIphoneX = () => {
    return (Platform.OS === 'ios' && (Number(((height/width)+"").substr(0,4)) * 100) === 216);
  };


  public safeAreaView = () => {
    if (this.isIphoneX() === true) {
      return { paddingTop: this.autoHeight(44), paddingBottom: this.autoHeight(34) };
    } else {
      return {};
    }
  }
}

export default new ScreenUtil();

const Util = new ScreenUtil();

/**
 * @param {UIColor} 全局色卡
 * 
 */
const UIColor = {
  mainColor: '#e3262e',
  secdColor: '#EDEDED',
  transport: 'rgba(0, 0, 0, 0)', //透明色UColor.transport
  white: '#ffffff',
  numberFont: '#FF7332', // 数字橘色
  grayFont: '#828E99', // 灰色字体
  titleBlack: '#2B2F33',
  imageBg: 'f4f4f4',
  untouchBlue: 'rgba(0, 0, 0, .5)',
  grayBorder: '#f2f2f2',
  inputFont: '#575E66',
  grayArea: '#f8f8f8',
  grayAreaBor: '#D9D9D9',
  grayHeader: ['#40474d', '#40474d'],
  orange: '#ff7332',
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 }, 
    shadowOpacity: 0.3,
    shadowRadius: 2, 
    elevation: 10 
  },
};

const commonStyle: any = {
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgStyle: (width: number, height?: number) => {
    return {
      width: Util.autoWidth(width),
      height: Util.autoHeight(height || width),
    }
  },

  border: (color?: string) => {
    return {
      // borderTopWidth: Util.autoWidth(1),
      // borderRightWidth: Util.autoWidth(1),
      // borderBottomWidth: Util.autoWidth(1),
      // borderLeftWidth: Util.autoWidth(1),
      borderTopWidth: Util.pixel,
      borderRightWidth: Util.pixel,
      borderBottomWidth: Util.pixel,
      borderLeftWidth: Util.pixel,
      borderTopColor: color ? color : UIColor.grayBorder,
      borderRightColor: color ? color : UIColor.grayBorder,
      borderBottomColor: color ? color : UIColor.grayBorder,
      borderLeftColor: color ? color : UIColor.grayBorder,
    }
  },

  textHeader: { 
    fontSize: Util.setSpText(22), 
    color: UIColor.titleBlack, 
    fontWeight: 'bold',
    marginLeft: Util.autoWidth(10),
    marginTop: Util.autoHeight(15),
  },

  dashBtn: {
      borderTopWidth: Util.pixel,
      borderRightWidth: Util.pixel,
      borderBottomWidth: Util.pixel,
      borderLeftWidth: Util.pixel,
  },

  footer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
  },

  input: {
      height: 33,
      borderRadius: 17,
      // backgroundColor: defaultTheme.defaultBackgroundColor,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 10,
      paddingRight: 10,
      textAlignVertical: 'center',
  },

  layout: (
    align: "flex-start" | "flex-end" | "center" | "stretch" | "baseline", 
    justify: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly",
    direction?: 'row' | 'column',
  ) => {

    if (!direction) {
      return {
        alignItems: align || 'flex-start',
        justifyContent: justify || 'flex-start',
      };
    } else {
      return {
        alignItems: align || 'flex-start',
        justifyContent: justify || 'flex-start',
        flexDirection: direction || '',
      };
    }
  },

  mar: (pos: 't' | 'l' | 'r' | 'b' | 'h' | 'v', value?: number) => {
    switch (pos) {
      case 'b':
        return {
          marginBottom: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 't':
        return {
          marginTop: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'l':
        return {
          marginLeft: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'r':
        return {
          marginRight: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'h': 
        return {
          marginHorizontal: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'v':
        return {
          marginVertical: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      
      default: 
        return {};
    }
  },

  pad: (pos: 't' | 'l' | 'r' | 'b' | 'h' | 'v', value?: number) => {
    switch (pos) {
      case 'b':
        return {
          paddingBottom: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 't':
        return {
          paddingTop: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'l':
        return {
          paddingLeft: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'r':
        return {
          paddingRight: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'h': 
        return {
          paddingHorizontal: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      case 'v':
        return {
          paddingVertical: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(20),
        };
      
      default: 
        return {};
    }
  },

  bor: (pos: 't' | 'l' | 'r' | 'b', value?: number, color?: string) => {
    switch (pos) {
      case 'b':
        return {
          borderBottomWidth: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(1),
          borderColor: color ? color : UIColor.grayBorder,
        };
      case 't':
        return {
          borderTopWidth: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(1),
          borderColor: color ? color : UIColor.grayBorder,
        };
      case 'l':
        return {
          borderLeftWidth: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(1),
          borderColor: color ? color : UIColor.grayBorder,
        };
      case 'r':
        return {
          borderRightWidth: typeof value === 'number' ? Util.autoWidth(value) : Util.autoWidth(1),
          borderColor: color ? color : UIColor.grayBorder,
        };
      
      default: 
        return {};
    }
  },
};

export { UIColor, commonStyle };