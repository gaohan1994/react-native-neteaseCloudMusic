import React from 'react';
import { Text, View, ViewStyle, ImageBackground, ScrollView, ImageStyle, Image, TextStyle, TouchableOpacity } from 'react-native';
import { Header, Dialog } from '../component';
import MediaController from '../action/MediaController';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import { getVideos } from '../store/media';
import ScreenUtil, { commonStyle } from '../common/style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ReactNativeVideo from 'react-native-video';

type VideoProps = {
  data: any;
};
type VideoState = {
  showPoster: boolean;
};
class Video extends React.Component<VideoProps, VideoState> {

  state = {
    showPoster: true,
  }

  public showPoster = () => {
    this.setState({showPoster: true});
  }

  public hidePoster = () => {
    this.setState({showPoster: false});
  }

  public onErrorHandle = (error: any) => {
    console.log('error: ', error);
  }

  render () {
    const { data } = this.props;
    const ViderCreator = ({creator}: any) => {

      const CreatorViewStyle: ViewStyle = {
        ...commonStyle.bor('t', 1),
        ...commonStyle.layout('center', 'space-between', 'row'),
        ...commonStyle.pad('v', 10),
        width: ScreenUtil.autoWidth(370),
      };

      const CreatorImage: ImageStyle = {
        width: ScreenUtil.autoWidth(30),
        height: ScreenUtil.autoWidth(30),
        borderRadius: ScreenUtil.autoWidth(15),
      };

      const CreatorText: TextStyle = {
        ...commonStyle.mar('l', 5),
        fontSize: ScreenUtil.setSpText(12),
      };

      const SubView: ViewStyle = {
        ...commonStyle.layout('center', '', 'row'),
      };

      const IconView: any = {
        ...commonStyle.mar('l', 14),
      };

      return (
        <View style={CreatorViewStyle}>
          <View style={SubView} >
            <Image
              source={{uri: creator.avatarUrl}} 
              style={CreatorImage}
            />
            <Text style={CreatorText} >{creator.nickname}</Text>
          </View>
          <View style={SubView}>
            <TouchableOpacity onPress={() => {Dialog.showToast('点赞成功')}}>
              <Icon name="like" size={20} style={IconView} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Icon name="share" size={20} style={IconView} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    const mvContainerViewStyle: ViewStyle = {
      ...commonStyle.layout('center', 'center', 'column'),
      ...commonStyle.mar('t', 3),
    };

    const mvSize: ImageStyle = {
      width: ScreenUtil.autoWidth(370),
      height: ScreenUtil.autoHeight(200),
      borderRadius: ScreenUtil.autoWidth(8),
    };

    const titleView: ViewStyle = {
      ...commonStyle.pad('v', 10),
      ...commonStyle.layout('center', 'flex-start'),
      width: ScreenUtil.autoWidth(370),
      flexDirection: 'row',
      flexWrap: 'wrap'
    };

    const titleText: TextStyle = {
      fontSize: ScreenUtil.setSpText(15),
      fontWeight: '500',
    };

    return (
      <View style={mvContainerViewStyle}>
        <View>
          {
            this.state.showPoster ? (
              <Image
                source={{uri: data.coverUrl}}
                resizeMode="cover"
                style={mvSize}
              />
            ) : (
              <ReactNativeVideo 
                // source={{uri: data.coverUrl}}
                style={mvSize}
                source={{uri: data.urlInfo && data.urlInfo.url}}
                controls={true}
                onLoad={() => this.hidePoster()}
                onError={this.onErrorHandle}
              />
            )
          }
        </View>
        <View style={titleView} >
          <Text style={titleText} >{data.title}</Text>
        </View>
        <ViderCreator creator={data.creator} />
      </View>
    );
  }
}

type Props = {
  videos: any[];
};

type State = {};

class VideoPage extends React.Component<Props, State> {

  componentDidMount = () => {
    MediaController.getVideo();
  }

  render() {
    const { videos } = this.props;
    return (
      <View style={{flex: 1}}>
        <Header />
        {this.renderVideos(videos)}
      </View>
    )
  }
  
  private renderVideos = (videos: any[]) => {
    return (
      <ScrollView 
        style={{flex: 1}}
        contentContainerStyle={commonStyle.pad('b', ScreenUtil.isIphoneX() === true ? 40 : 10)}
      >
        {
          videos.map((video: any) => {
            return <Video key={video.vid} data={video} />
          })
        }
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: Stores) => ({
  videos: getVideos(state)
});

export default connect(mapStateToProps)(VideoPage);