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
} from 'react-native'
import ScreenUtil, { commonStyle, UIColor } from '../common/style';
import { 
  Header,
  Progress
} from '../component';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { BlurView } from 'react-native-blur';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
import { DispatchAbstract } from '../action/actions';
import MediaController from '../action/MediaController';
import { Stores } from '../store/index';
import { getCurrentSongDetail } from '../store/media';


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
    <TouchableOpacity style={[styles.headerContainerStyle]}>
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
};

type State = {
  viewRef: any;
};

class MediaPlay extends React.Component<Props, State> {

  private backgroundImage: any;

  state = { viewRef: null };

  componentDidMount = () => {
    /**
     * @param {1.请求当前歌曲详情}
     */
    this.fetchSongUrl(this.props);
  }

  componentDidUpdate = () => {

  }

  public fetchSongUrl = (props: Props) => {
    const { dispatch, navigation } = props;
    const params: DispatchAbstract<{ids: string[]}> = {
      dispatch,
      param: {
        ids: ['347230', '347231']
      }
    };

    MediaController.getSongUrl(params);
  }

  public imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    
    const containerViewStyle: ViewStyle = { flex: 1 };

    return (
      <View
        style={containerViewStyle}
      >
        <Image
          ref={(img) => { this.backgroundImage = img; }}
          source={{uri: 'https://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg'}}
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
        <StatusBar barStyle="dark-content" />

        <Header
          style={{backgroundColor: 'rgba(0, 0, 0, 0)'}}
          content={this.renderHeader()}
        />
        {this.renderContent()}
        {this.renderFooter()}
      </View>
    );
  }

  private renderHeader = () => {

    return (
      <View style={styles.headerContainerStyle} >
        {renderIcon('arrow-left', () => {})}
        <View style={[styles.headerContainerStyle, {flex: 3, flexDirection: 'column'}]}>
          <Text style={[{ color: UIColor.white, fontSize: ScreenUtil.setSpText(12) }]} >给你的爱一直很安静</Text>
          <Text style={[{ color: UIColor.white, fontSize: ScreenUtil.setSpText(12) }]} >阿桑</Text>
        </View>
        {renderIcon("share-alt", () => {})}
      </View>
    );
  }

  private renderContent = () => {
    return (
      <View>
        <Text>renderContent</Text>
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

    return (
      <View style={footerViewStyle}>
        <Progress />
        <View style={{flexDirection: 'row'}} >
          {renderIcon("loop", () => {})}
          {renderIcon("control-start", () => {})}
          {renderIcon("control-play", () => {}, {size: 28})}
          {renderIcon("control-end", () => {})}
          {renderIcon("list", () => {})}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  },
  headerContainerStyle: {
    ...commonStyle.layout('center', 'center'),
    flexDirection: 'row',
    flex: 1,
  }
});

const mapStateToProps = (state: Stores) => ({
  currentSong: getCurrentSongDetail(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MediaPlay);