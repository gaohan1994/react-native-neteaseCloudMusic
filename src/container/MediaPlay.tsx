import React, { Dispatch } from 'react'
import { 
  Text, 
  View,
  ViewStyle, 
  StatusBar, 
  StyleSheet, 
  Image, 
  findNodeHandle, 
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  ImageBackground,
  Easing,
} from 'react-native'
import ScreenUtil, { commonStyle, UIColor } from '../common/style';
import { 
  Header,
  Progress,
  Player
} from '../component';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { BlurView } from 'react-native-blur';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { DispatchAbstract, AbstractParams } from '../action/actions';
import MediaController from '../action/MediaController';
import { Stores } from '../store/index';
import { getCurrentSongDetail, getControll, MediaControll } from '../store/player';
import UIImage from '../img/index';
import Dialog from '../component/Dialog';
import { ScrollView } from 'react-native';
import { getPlayMood, PLAY_MOOD } from '../store/media';
import invariant from '../common/invariant';

export function parseLyric(lrc: any) {
  var lyrics = lrc.split("\n");
  var lrcObj = {};
  for(var i=0;i<lyrics.length;i++){
      var lyric = decodeURIComponent(lyrics[i]);
      var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
      var timeRegExpArr = lyric.match(timeReg);
      if(!timeRegExpArr)continue;
      var clause = lyric.replace(timeReg,'');
      for(var k = 0,h = timeRegExpArr.length;k < h;k++) {
          var t = timeRegExpArr[k];
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
              sec = Number(String(t.match(/\:\d*/i)).slice(1));
          var time = min * 60 + sec;
          lrcObj[time] = clause;
      }
  }
  return lrcObj;
}

const iconProps = {
  color: UIColor.white,
  size: ScreenUtil.autoWidth(20)
}

const renderIcon = (
  name: string, 
  onPress: () => void,
  ...rest: any
): JSX.Element => {
  let restIconProps = {};
  {
    rest && rest[0] ? restIconProps = rest[0] : {}
  }
  return (
    <TouchableOpacity style={[styles.headerContainerStyle]} onPress={onPress} >
      <Icon 
        name={name} 
        {...iconProps}
        {...restIconProps}
      />
    </TouchableOpacity>
  );
}

type Props = {
  dispatch: Dispatch<any>;
  navigation: NavigationScreenProp<any>;
  currentSong: any;
  controll: MediaControll;
  playMood: any;
};

type State = {
  viewRef: any;
  contentType: 'Cover' | 'Lyric'
};

class MediaPlay extends React.Component<Props, State> {

  private animatedLoopEvent: Animated.CompositeAnimation;
  private animatedValue: Animated.Value;
  private backgroundImage: any;

  constructor (props: Props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
    this.animatedLoopEvent = Animated.timing(this.animatedValue, {
      toValue: 10,
      duration: 300000,
      easing: Easing.linear
    });
    this.initHandle(props);
  }

  state: State = { 
    viewRef: null,
    contentType: 'Cover'
  };

  public initHandle = (props: Props) => {
    const { controll } = props;
  }

  componentWillReceiveProps = (nextProps: Props) => {
    const { controll: { paused : currentPaused } } = this.props;
    const { controll: { paused : nextPaused } } = nextProps;
    if (currentPaused === nextPaused) {
      return;
    } else if (nextPaused === false) {
      this.animatedHandle();
    } else if (nextPaused === true) {
      this.pauesdAnimatedHandle();
    }
  }

  componentDidMount = () => {
    this.fetchSong(this.props);
    /**
     * @param {1.请求当前歌曲详情}
     */
    // this.fetchSongUrl(this.props);

    this.animatedHandle();
  }

  componentDidUpdate = () => {

  }

  componentWillUnmount = () => {
    this.animatedLoopEvent.stop();
  }

  public fetchSong = async (props: Props) => {
    const { dispatch, navigation } = props;
    const ids = navigation.getParam('ids');
    const currentSong = navigation.getParam('currentSong') || {};
    const params: DispatchAbstract<{ids: string[], currentSong: any}> = {
      dispatch,
      param: { ids, currentSong }
    };
    MediaController.getSong(params);
  }

  public fetchSongUrl = (props: Props) => {
    const { dispatch, navigation } = props;
    const ids = navigation.getParam('ids');
    const params: DispatchAbstract<{ids: string[]}> = {
      dispatch,
      param: { ids }
    };
    MediaController.getSongUrl(params);
  }

  public imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  /**
   * @param {切换content显示类别}
   */
  public onContentPressHandle = () => {
    this.setState((prevState: State) => {
      if (prevState.contentType === 'Cover') {
        return {
          ...prevState,
          contentType: 'Lyric'
        };
      } else {
        return {
          ...prevState,
          contentType: 'Cover'
        };
      }
    })
  }

  private animatedHandle = () => {
    this.animatedLoopEvent.start();
  }

  private pauesdAnimatedHandle = () => {
    this.animatedLoopEvent.stop();
  }

  public onPauseHandle = () => {
    const params: AbstractParams = { param: { paused: true } };
    MediaController.playerControll(params);
  }

  public onPlayHandle = () => {
    const params: AbstractParams = { param: { paused: false } };
    MediaController.playerControll(params);
  }

  public changeMood = async (mood: string) => {
  
    try {
      const { success } = await MediaController.changePlayMood(mood);  

      invariant(
        success,
        '切换模式失败'
      );

      const message = 
        mood === PLAY_MOOD.ORDER_PLAYING 
          ? '顺序播放'
          : mood === PLAY_MOOD.RANDOM_PLAYING
            ? '随机播放'
            : ''

      Dialog.info(message);
    } catch (error) {
      Dialog.showToast(error.message);
    }
  }

  public onChangeSong = async (type: string) => {

    const checkSuccessHandle = ({ success, message }: any) => {

      if (success === false) {
        Dialog.showToast(message);
      }
    }

    switch (type) {
      case 'NEXT':
        const nextResult = await MediaController.nextSong();
        checkSuccessHandle(nextResult);
        return;
      case 'LAST':
        const lastResult = await MediaController.lastSong();
        checkSuccessHandle(lastResult);
        return;
      default: 
        return;
    }
  }

  render() {
    const containerViewStyle: ViewStyle = { flex: 1 };
    const { currentSong } = this.props;
    return (
      <View
        style={containerViewStyle}
      >
        <Image
          ref={(img) => { this.backgroundImage = img; }}
          source={{uri: currentSong.al && currentSong.al.picUrl || ''}}
          style={styles.absolute}
          onLoadEnd={this.imageLoaded.bind(this)}
          resizeMode="cover"
        />
        <BlurView
          style={styles.absolute}
          viewRef={this.state.viewRef}
          blurType="dark"
          blurAmount={10}
        />
        <StatusBar barStyle="light-content" />

        <Header
          style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
          content={this.renderHeader()}
        />

        <Player />
        {this.renderContent()}
        {this.renderFooter()}
      </View>
    );
  }

  private renderHeader = () => {
    const { currentSong } = this.props;
    const artists: string[] = [];

    currentSong && currentSong.ar && currentSong.ar.forEach((artist: any) => {
      artists.push(artist.name);
    });

    return (
      <View style={styles.headerContainerStyle} >
        {renderIcon('arrow-left', () => {this.props.navigation.goBack()})}
        <View style={[styles.headerContainerStyle, {flex: 3, flexDirection: 'column'}]}>
          <Text style={[{ color: UIColor.white, fontSize: ScreenUtil.setSpText(12) }]} >
            {currentSong.name}
          </Text>
          <Text style={[{ color: UIColor.white, fontSize: ScreenUtil.setSpText(12) }]} >
            {artists.join(',')}
          </Text>
        </View>
        {renderIcon("share-alt", () => {})}
      </View>
    );
  }

  private renderContent = () => {
    const { contentType } = this.state;
    const { currentSong } = this.props;

    const interpolatedAnimation = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    const AnimatedViewTransform = {
      transform: [{
        rotate: interpolatedAnimation
      }]
    };

    const lycContainer: ViewStyle = {
      // width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
      height: ScreenUtil.autoWidth(300),
    };

    const RenderLycs = ({lyc}: any) => {

      const lycView: ViewStyle = {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }

      const lycs = [];
      const parseLyc: any = parseLyric(lyc);
      for (let key in parseLyc) {

        if (parseLyc[key]) {
          console.log('parseLyc[key]: ', parseLyc[key]);
          lycs.push(
            <Text key={key} style={{color: UIColor.white, marginTop: ScreenUtil.autoWidth(2)}} >
              {parseLyc[key]}
            </Text>
          )
        }
      }
      return <View style={lycView}>{lycs}</View>;
    }

    return (
      <View style={{flex: 1}}>
        {
          contentType === 'Cover' ? (
            <TouchableOpacity  onPress={this.onContentPressHandle} style={styles.contentContainer}>
              <Animated.View style={AnimatedViewTransform}>
                <ImageBackground
                  style={styles.imageCover}
                  source={UIImage.circle}
                >
                  <Image 
                    style={styles.cover}
                    source={{uri: currentSong.al && currentSong.al.picUrl}} 
                  />
                </ImageBackground>
              </Animated.View>
            </TouchableOpacity>
          ) : (
            <View style={[styles.contentContainer, { justifyContent: 'center', alignItems: 'center' }]}>
              <TouchableOpacity onPress={this.onContentPressHandle} style={{position: 'absolute', top: 10, left: 10}}>
                <Text style={{color: UIColor.white}}>返回封面</Text>
              </TouchableOpacity>
              <View style={lycContainer}>
                {
                  currentSong.lyc && currentSong.lyc.lyric ? (
                    <ScrollView 
                      style={{flex: 1}}
                      contentContainerStyle={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}
                    >
                      <RenderLycs lyc={currentSong.lyc.lyric} />  
                    </ScrollView>
                  ) : (
                    <Text>歌词加载中</Text>
                  )
                }
              </View>
            </View>
          )
        }
      </View>
    );
  }

  private renderFooter = () => {

    const footerViewStyle: ViewStyle = {
      ...commonStyle.layout('center', 'space-around'),
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'column',
      paddingBottom: ScreenUtil.isIphoneX() === true ? ScreenUtil.autoHeight(34) : ScreenUtil.autoHeight(10),
    };

    const { controll: { paused }, playMood } = this.props;

    return (
      <View style={footerViewStyle}>
        <Progress />
        <View style={{flexDirection: 'row'}} >
          {
            playMood === PLAY_MOOD.ORDER_PLAYING ? (
              renderIcon("loop", () => this.changeMood(PLAY_MOOD.RANDOM_PLAYING))
            ) : (
              renderIcon("shuffle", () => this.changeMood(PLAY_MOOD.ORDER_PLAYING))
            )
          }
          {renderIcon("control-start", () => this.onChangeSong('LAST'))}
          {
            paused === false ? (
              renderIcon("control-pause", () => this.onPauseHandle(), {size: 28})
            ) : (
              renderIcon("control-play", () => this.onPlayHandle(), {size: 28})
            )
          }
          {renderIcon("control-end", () => this.onChangeSong('NEXT'))}
          {renderIcon("list", () => {})}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: Stores) => {
  const controll = getControll(state);

  return {
    currentSong: getCurrentSongDetail(state),
    controll,
    playMood: getPlayMood(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
  headerContainerStyle: {
    ...commonStyle.layout('center', 'center'),
    flexDirection: 'row',
    flex: 1,
  },
  contentContainer: {
    ...commonStyle.layout('center', 'center'),
    flexDirection: 'column',
    flex: 1,
  },
  imageCover: {
    ...commonStyle.layout('center', 'center'),
    width: ScreenUtil.autoWidth(300),
    height: ScreenUtil.autoWidth(300),
  },
  cover: {
    width: ScreenUtil.autoWidth(200),
    height: ScreenUtil.autoWidth(200),
    borderRadius: ScreenUtil.autoWidth(200 / 2),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlay);