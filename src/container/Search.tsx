import React from 'react';
import { Text, View, ScrollView, ViewStyle, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard, StatusBar, FlatList, TextStyle } from 'react-native';
import SearchController from '../action/SearchController';
import ScreenUtil, { commonStyle, UIColor } from '../common/style';
import { Button } from 'teaset';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import { getHots, getSearchData } from '../store/search';
import NavigationService from '../NavigationService';
import Dialog from '../component/Dialog';
import invariant from '../common/invariant';

const SearchItem = ({item, index}: any): any => {

  const onSongPressHandle = (item: any) => {
    const ids: any[] = [item.id];
    NavigationService.navigate({routeName: 'Media', params: { ids, currentSong: item || { id: ids[0] } }});
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

  const singer: string[] = [];

  {
    item && item.artists && item.artists.length > 0 
    ? item.artists.forEach((s: any) => {
      singer.push(s.name);
    })
    : null
  }
  console.log('singer: ', singer);
  return (
    <TouchableOpacity style={itemViewStyle} onPress={() => onSongPressHandle(item)} >
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
          {item.album && item.album.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

type Props = {
  hots: any[];
  searchData: any;
};

type State = {
  value: string;
  loading: boolean;
};

class Search extends React.Component<Props, State> {
  state = {
    value: '',
    loading: false,
  };

  private textInput: any;

  componentDidMount() {
    SearchController.searchHot();
  }

  public onSubmitEditing = () => {
    const { value } = this.state;
    
    Keyboard.dismiss();
    if (!value) { 
      NavigationService.goBack(); 
    } else {
      this.searchData();
    }
  }

  public onBlur = () => {
    const { value } = this.state;
    Keyboard.dismiss();
    if (!value) { 
      NavigationService.goBack(); 
    } else {
      this.searchData();
    }
  }

  public showLoading = () => {
    this.setState({ loading: true });
  }
  public hideLoading = () => {
    this.setState({ loading: false });
  }

  public changeValueHandle = (text: string) => {
    this.setState({ value: text });
  }

  public searchData = async () => {
    const params = {
      keywords: this.state.value
    };

    try {

      this.showLoading();
      const { success, result } = await SearchController.search(params);  
      invariant(
        success,
        result || ' '
      );
      this.hideLoading();
    } catch (error) {
      Dialog.showToast(error.message);
    } finally {
      this.hideLoading();
    }
  }

  render() {
    const mainScrollViewStyle: ViewStyle = {
      flex: 1
    };

    const { searchData } = this.props;

    return (
      <View style={{flex: 1}}>
        {this.renderHeader()}

        {
          searchData && searchData.songs ? (
            <FlatList
              style={[commonStyle.pad('t', 20), commonStyle.mar('b', 20)]}
              data={searchData.songs}
              contentContainerStyle={commonStyle.pad('b', 150)}
              renderItem={this.renderItem}
              keyExtractor={this.keyExtractor}
              initialNumToRender={10}
              onEndReachedThreshold={0.1}
              refreshing={this.state.loading}
              // onRefresh={this.onRefresh}
              // onEndReached={this.onEndReached}
              keyboardDismissMode="on-drag"
              keyboardShouldPersistTaps="always"
            />
          ) : (
            <ScrollView style={mainScrollViewStyle} >
              <View style={[mainScrollViewStyle]}>
                {this.renderSearchHot()}
              </View>
            </ScrollView>
          )
        }
      </View>
    )
  }

  /**
   * key 唯一
   *
   * @private
   * @memberof HomeFlatList
   */
  private keyExtractor = (item: any, index: number): string => index + '';

  /**
   * 渲染子组件函数
   * 
   * item: 每项数据
   *
   * @private
   */
  private renderItem = ({ item, index }: any): React.ReactElement<any> => {
    return (
      <SearchItem
        item={item}
        index={index}
        // onPress={() => { this.props.navigation.navigate('Product', { product: item }) }} 
      />
    );
  }

  private renderHeader = (): JSX.Element => {
    return (
      <View 
        style={[
          {
            // height: Header.HeaderHeight,
            flexDirection: 'row',
            alignItems: 'center'
          },
          commonStyle.pad('t', ScreenUtil.isIphoneX() === true ? ScreenUtil.autoHeight(20 + 20) : ScreenUtil.autoHeight(20 + 10)),
          commonStyle.pad('h', 15),
        ]}
      >
        <StatusBar barStyle="dark-content" /> 
        <View style={[{backgroundColor: UIColor.white, width: ScreenUtil.autoWidth(280), alignItems: 'center', justifyContent: 'center'}, commonStyle.mar('l', 10)]}>
          <View
            style={[{
              backgroundColor: '#F2F2F2', 
              width: ScreenUtil.autoWidth(280), 
              borderRadius: ScreenUtil.autoHeight(20), 
              height: ScreenUtil.autoHeight(40),
              flexDirection: 'row',
              alignItems: 'center'
            }, commonStyle.pad('l', 15)]}
          >
            <Image style={{width: ScreenUtil.autoWidth(15), height: ScreenUtil.autoHeight(15)}} source={{uri: 'http://net.huanmusic.com/eos/ic_search@3x.png'}} />
            <TextInput 
              ref={(textInput) => { this.textInput = textInput }}
              value={this.state.value}
              onChangeText={this.changeValueHandle}
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
              onBlur={() => this.onBlur()}
              style={[{width: ScreenUtil.autoWidth(200), fontSize: ScreenUtil.setSpText(15), color: UIColor.grayFont}, commonStyle.mar('l', 10)]} 
              onSubmitEditing={this.onSubmitEditing}
            />
          </View>
        </View>
        <TouchableOpacity style={commonStyle.mar('l', 10)} onPress={() => { NavigationService.goBack(); }}>
          <Text style={{fontSize: ScreenUtil.setSpText(16), color: UIColor.titleBlack}} >取消</Text>
        </TouchableOpacity>
      </View>
    );
  }

  private renderSearchHot = (): JSX.Element => {

    const hotsStyle: ViewStyle = {
      ...commonStyle.pad('h', 10),
      ...commonStyle.pad('v', 10),
    };

    const hotItemStyle: ViewStyle = {
      ...commonStyle.pad('h', 10),
      ...commonStyle.mar('b', 10),
      backgroundColor: UIColor.grayArea,
      borderRadius: ScreenUtil.autoHeight(10),
    };

    const { hots } = this.props;

    return (
      <View style={hotsStyle} >
        <Text style={styles.searchTitle}>热门搜索</Text>
        
        <View style={[{flexDirection: 'row', flexWrap: 'wrap'}, commonStyle.mar('t', 8)]} >
          {
            hots && hots.length > 0 ? hots.map((hot: any, index: number) => {
              return (
                <Button key={index} style={hotItemStyle} title={hot.first} type="link" size="sm" />
              )
            }) : (
              <Text>加载中</Text>
            )
          }
          
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchTitle: {
    fontSize: ScreenUtil.setSpText(13),
    fontWeight: '700',
  }
});

const mapStateToProps = (state: Stores) => ({
  hots: getHots(state),
  searchData: getSearchData(state),
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);