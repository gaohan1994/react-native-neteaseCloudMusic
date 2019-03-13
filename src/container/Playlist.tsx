import React from 'react';
import { Text, View, ScrollView, ViewStyle, ImageBackground, Image, StyleSheet, FlatList, TextStyle, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import { HeaderLeft } from '../component/Header';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import { getPlaylistDetail } from '../store/discover';
import DiscoverController from '../action/DiscoverController';
import { AbstractParams } from '../action/actions';
import { NavIcon } from './Discover';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Dialog } from '../component';

const ImageSize = {
  width: ScreenUtil.autoWidth(120),
  height: ScreenUtil.autoHeight(120)
};

type Props = {
  playlistDetail: any;
  navigation: NavigationScreenProp<any>;
};

type State = {};

class Playlist extends React.Component<Props, State> {

  componentDidMount = () => {
    const { navigation } = this.props;
    const playlistId = navigation.getParam('id');
    const payload: AbstractParams = {
      param: `id=${playlistId}`
    };
    
    DiscoverController.playlistDetail(payload);
  }
  

  static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<any> }) => {
    return {
      title: '歌单',
      headerTitleStyle: {fontSize: ScreenUtil.setSpText(14), fontWeight: 'bold', color: UIColor.white},
      headerLeft: <HeaderLeft navigation={navigation}/>,
      headerStyle: {backgroundColor: UIColor.mainColor}
    };
  };

  public onSongPressHandle = (item?: any) => {
    const { navigation, playlistDetail } = this.props;
    const ids: any[] = playlistDetail.trackIds.map((id: any) => `${id.id}`);
    navigation.navigate({routeName: 'Media', params: { ids, currentSong: item || { id: ids[0] } }});
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
        >
          {this.renderDetail()}
          
          {this.renderPlaylist()}
          <Text> Playlist </Text>
        </ScrollView>
      </View>
    );
  }

  private renderDetail = (): JSX.Element => {

    const detailSize = {
      width: ScreenUtil.autoWidth(350),
    };

    const detailViewStyle: ViewStyle = {
      ...commonStyle.layout('center', 'center'),
      flexDirection: 'column',
      width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
      height: ScreenUtil.autoHeight(200),
    };

    const coverViewStyle: ViewStyle = {
      ...commonStyle.layout('center', 'space-between'),
      flexDirection: 'row',
    };

    const { playlistDetail } = this.props;

    return (
      <ImageBackground
        style={detailViewStyle}
        source={{uri: playlistDetail.coverImgUrl}}
        resizeMode="cover"
        blurRadius={80}
      >
        <View style={[coverViewStyle, detailSize]}>
          <Image style={ImageSize} source={{uri: playlistDetail.coverImgUrl}}/>
          <View style={styles.CoverName} >
            <Text style={styles.playlistName} numberOfLines={2} >{playlistDetail.name}</Text>
            <View style={styles.creater}>
              <Image 
                source={{uri: playlistDetail && playlistDetail.creator && playlistDetail.creator.avatarUrl}} 
                style={[styles.Avator, commonStyle.mar('r', 5)]}
              />
              <Text style={[styles.createrName, commonStyle.mar('r', 5)]}>{playlistDetail.creator && playlistDetail.creator.nickname || '作者'}</Text>
              <Icon name="arrow-right" color={UIColor.white} size={10} />
            </View>
          </View>
        </View>
        <View style={[coverViewStyle, commonStyle.mar('t', 10), { width: ScreenUtil.autoWidth(375) }]}>
          <NavIcon background={false} textColor={UIColor.white} name="speech" value="12" />
          <NavIcon background={false} textColor={UIColor.white} name="share-alt" value="2" />
          <NavIcon background={false} textColor={UIColor.white} name="arrow-down-circle" value="下载" />
          <NavIcon background={false} textColor={UIColor.white} name="check" value="多选" />
        </View>
      </ImageBackground>
    );
  }

  private renderPlaylist = (): JSX.Element => {

    const { playlistDetail } = this.props;
    const PlayControllView: ViewStyle = {
      ...commonStyle.layout('', '', 'row'),
      // height: ScreenUtil.autoHeight(50),
      
    };
    const SubView: ViewStyle = {
      ...commonStyle.layout('center', '', 'row'),
      height: ScreenUtil.autoHeight(50),
    };

    const PlayTextStyle: TextStyle = {
      fontSize: ScreenUtil.setSpText(13),
    };

    return (
      <View>
        <View style={PlayControllView}>
          <TouchableOpacity 
            onPress={() => this.onSongPressHandle()}
            style={[SubView, { flex: 3, ...commonStyle.pad('l', 10)}]}
          >
            <Icon name="control-play" size={20} />
            <Text style={[PlayTextStyle, {...commonStyle.mar('l', 5)}]} >播放全部({`共${playlistDetail.trackCount}首`})</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              Dialog.showToast('收藏成功！');
            }}
            style={[
              SubView, { 
                flex: 1, 
                // borderTopRightRadius: ScreenUtil.autoWidth(10), 
                justifyContent: 'center',
                backgroundColor: UIColor.mainColor,
              }
            ]}
          >
            <Icon name="plus" size={20} color={UIColor.white} />
            <Text style={[PlayTextStyle, { color: UIColor.white, ...commonStyle.mar('l', 5) }]} >收藏</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={playlistDetail && playlistDetail.tracks || []}
          renderItem={this.renderItem}
          contentContainerStyle={commonStyle.pad('b', 30)}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }

  private keyExtractor = (item: any, index: number): string => index + '';

  private renderItem = ({item, index}: any): any => {

    const itemViewStyle: ViewStyle = {
      width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
      height: ScreenUtil.autoHeight(50),
      flexDirection: 'row',
      ...commonStyle.bor('t', 1),
    };

    const NumberView: TextStyle = {
      fontSize: ScreenUtil.setSpText(12),
      color: UIColor.grayFont
    };

    const detailViewStyle: ViewStyle = {
      ...commonStyle.layout('flex-start', 'space-around'),
    };

    const SongName: TextStyle = {
      fontSize: ScreenUtil.setSpText(14),
      fontWeight: '400',
    };

    const SingerName: TextStyle = {
      fontSize: ScreenUtil.setSpText(12),
      color: UIColor.grayFont
    };

    const singer: string[] = [];

    {
      item && item.ar && item.ar.length > 0 
      ? item.ar.forEach((s: any) => {
        singer.push(s.name);
      })
      : null
    }

    return (
      <TouchableOpacity style={itemViewStyle} onPress={() => this.onSongPressHandle(item)} >
        <View
          style={{
            ...commonStyle.layout('center', 'center'),
            width: ScreenUtil.autoWidth(50),
            height: ScreenUtil.autoWidth(50),
          }}
        >
          <Text style={NumberView}>{index + 1}</Text>
        </View>
        <View style={detailViewStyle}>
          <Text numberOfLines={1} style={SongName}>{item.name}</Text>
          <Text numberOfLines={1} style={SingerName}>
            {singer && singer.length > 0 ? singer.join(',') : ''}
            {`  -  `}
            {item.al && item.al.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  playlistName: {
    color: UIColor.white,
    fontSize: ScreenUtil.setSpText(15),
    fontWeight: 'bold'
  },
  CoverName: {
    ...commonStyle.layout('flex-start'),
    ...commonStyle.pad('l', 15),
    flex: 1,
    flexDirection: 'column',
  },
  creater: {
    ...commonStyle.mar('t', 15),
    flexDirection: 'row',
    alignItems: 'center'
  },
  Avator: {
    width: ScreenUtil.autoWidth(24),
    height: ScreenUtil.autoHeight(24),
    borderRadius: ScreenUtil.autoWidth(12),
  },
  createrName: {
    fontSize: ScreenUtil.setSpText(12),
    color: UIColor.white,
  }
});

const mapStateToProps = (state: Stores) => ({
  playlistDetail: getPlaylistDetail(state),
});

export default connect(mapStateToProps)(Playlist);