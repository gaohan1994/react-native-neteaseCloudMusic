import React, { Dispatch }  from 'react';
import { Text, View, FlatList, ViewStyle, Image, TouchableOpacity } from 'react-native';
import { Header } from '../component';
import { connect } from 'react-redux';
import { Stores } from '../store';
import MediaController from '../action/MediaController';
import { getMyPlaylist } from '../store/media';
import ScreenUtil, { commonStyle, UIColor } from '../common/style';
import NavigationService from '../NavigationService';

type Props = {
  myPlaylist: any[];
};

type State = {};
class Mine extends React.Component<Props, State> {

  componentDidMount = () => {
    MediaController.getMinePlaylist();
  }

  render() {

    const { myPlaylist } = this.props;
    console.log('myPlaylist: ', myPlaylist);

    const PlaylistTitle: ViewStyle = {
      ...commonStyle.pad('v', 10),
      ...commonStyle.pad('h', 10),
      backgroundColor: UIColor.grayArea,
    };

    return (
      <View style={{flex: 1}}>
        <Header />
        <View style={PlaylistTitle}>
          <Text style={{fontSize: ScreenUtil.setSpText(13)}}>我的歌单（{`${myPlaylist.length}`}）</Text>
        </View>
        {this.renderPlaylistView(myPlaylist)}
      </View>
    );
  }

  private renderPlaylistView = (playlist: any[]) => {

    return (
      <FlatList
        data={playlist || []}
        renderItem={this.renderItem}
        contentContainerStyle={commonStyle.pad('b', 30)}
        keyExtractor={this.keyExtractor}
        // refreshing={refreshing}
        // onRefresh={this.onRefresh}
        // initialNumToRender={10}
        // onEndReachedThreshold={0.1}
        // onEndReached={this.onEndReached}
        // ListEmptyComponent={(<Empty title="暂无更多商品！" />)}
      />
    );
  }

  private keyExtractor = (item: any, index: number): string => index + '';

  private renderItem = ({item}: any) => {

    const ItemView: ViewStyle = {
      ...commonStyle.layout('center', '', 'row'),
      ...commonStyle.pad('h', 8),
      ...commonStyle.pad('v', 4),
    };

    const detailView: ViewStyle = {
      ...commonStyle.layout('', 'center', 'column'),
      ...commonStyle.mar('l', 4),
      ...commonStyle.bor('b', 1),
      ...commonStyle.bor('t', 1),
      flex: 1,
      height: ScreenUtil.autoWidth(50),
    };

    const ImageSize: any = {
      width: ScreenUtil.autoWidth(50),
      height: ScreenUtil.autoWidth(50),
      borderRadius: ScreenUtil.autoWidth(4),
    };

    return (
      <TouchableOpacity 
        style={ItemView}
        onPress={() => this.onPress(item)}
      >
        <Image 
          source={{uri: item.coverImgUrl}}
          style={ImageSize}
        />
        <View style={detailView}>
          <Text  
            style={{
              fontSize: ScreenUtil.setSpText(14),
              color: UIColor.titleBlack,
              fontWeight: '500'
            }}
          >{item.name}</Text>
          <Text  
            style={{
              fontSize: ScreenUtil.setSpText(12),
              color: UIColor.grayFont
            }}
          >
            {`${item.trackCount}首， by ${item.creator && item.creator.nickname}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  private onPress = (playlist: any) => {
    NavigationService.navigate({routeName: 'Playlist', params: playlist});
  }
}

const mapStateToProps = (state: Stores) => ({
  myPlaylist: getMyPlaylist(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);