import React, { Dispatch }  from 'react';
import { Text, View, FlatList, ViewStyle, Image, TouchableOpacity, TextStyle } from 'react-native';
import { Header } from '../component';
import { connect } from 'react-redux';
import { Stores } from '../store';
import MediaController from '../action/MediaController';
import { getMyPlaylist, getCollectList } from '../store/media';
import ScreenUtil, { commonStyle, UIColor } from '../common/style';
import NavigationService from '../NavigationService';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { ListRow } from 'teaset';
import invariant from '../common/invariant';
import Dialog from '../component/Dialog';

const CollectItem = ({item, index}: any): any => {

  const deleteCollect = async () => {
    try {
      const payload = {
        collectionId: item.collectionId
      };
      const { success } = await MediaController.removeCollect(payload);

      invariant(
        success,
        '取消收藏失败'
      );

      Dialog.success('取消收藏');
      MediaController.collectList();
    } catch (error) {
      Dialog.showToast(error.message);
    }
  }

  const onSongPressHandle = (item: any) => {
    const ids: any[] = [item.musicId];
    NavigationService.navigate({routeName: 'Media', params: { ids, currentSong: { id: ids[0] } }});
  }

  console.log('item: ', item);
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

  return (
    <ListRow
      title={(
        <View style={itemViewStyle}>
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
            <Text numberOfLines={1} style={SongName}>{item.musicName}</Text>
            <Text numberOfLines={1} style={SingerName}>
              {item.musicArtist}
              {`  -  `}
              {item.musicAlbum && item.musicAlbum}
            </Text>
          </View>
        </View>
      )}
      swipeActions={[
        <ListRow.SwipeActionButton title='删除' type='danger' onPress={() => deleteCollect()}/>,          
      ]}
      onPress={() => onSongPressHandle(item)}
    />
  );
}

type Props = {
  myPlaylist: any[];
  collectList: any[];
};

type State = {};
class Mine extends React.Component<Props, State> {

  componentDidMount = () => {
    MediaController.getMinePlaylist();
    MediaController.collectList();
  }

  public myCollectRefresh = () => {
    MediaController.collectList();
  }

  public onChangeTab = (tab: any) => {
    console.log('tab: ', tab);

    if (tab.i === 0) {
      MediaController.getMinePlaylist();
    } else {
      MediaController.collectList();
    }
  }

  render() {

    const { myPlaylist, collectList } = this.props;
    console.log('myPlaylist: ', myPlaylist);

    const PlaylistTitle: ViewStyle = {
      ...commonStyle.pad('v', 10),
      ...commonStyle.pad('h', 10),
      backgroundColor: UIColor.grayArea,
    };

    return (
      <View style={{flex: 1}}>
        <Header />
        <ScrollableTabView
          onChangeTab={this.onChangeTab}
        >
          <View style={{flex: 1}} tabLabel="我的歌单" >
            <View style={PlaylistTitle}>
              <Text style={{fontSize: ScreenUtil.setSpText(13)}}>我的歌单（{`${myPlaylist.length}`}）</Text>
            </View>
            {this.renderPlaylistView(myPlaylist)}
          </View>

          <View style={{flex: 1}} tabLabel="我收藏的歌曲" >
            <View style={PlaylistTitle}>
              <Text style={{fontSize: ScreenUtil.setSpText(13)}}>我收藏的歌曲</Text>
            </View>

            {/* {this.renderPlaylistView()} */}

            <FlatList
              data={collectList || []}
              renderItem={this.renderCollectMusic}
              contentContainerStyle={commonStyle.pad('b', 30)}
              onRefresh={this.myCollectRefresh}
              refreshing={false}
              ListEmptyComponent={<Text>暂无收藏的音乐</Text>}
              // keyExtractor={this.keyExtractor}
            /> 
          </View>
        </ScrollableTabView>
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
      />
    );
  }

  private keyExtractor = (item: any, index: number): string => index + '';

  private renderCollectMusic = ({item, index}: any) => {
    // 有个问题是必须请求每首歌的详情

    return (
      <CollectItem item={item} index={index} />
    );
  }

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
  collectList: getCollectList(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Mine);