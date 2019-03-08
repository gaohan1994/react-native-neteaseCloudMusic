import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback, Image, ViewStyle, ImageStyle, TouchableOpacity, ImageBackground, TextStyle } from 'react-native';
import Header from '../component/Header';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import Swiper from 'react-native-swiper';
import DiscoverController from '../action/DiscoverController';
import { Stores } from '../store/index';
import { connect } from 'react-redux';
import { getBanners, getPersonalized, getPersonalizedNewSong } from '../store/discover';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

type Props = {
  banners: any[];
  personalized: any[];
  personalizedNewSong: any[];
};

type State = {};

const RenderTitle = ({
  title,
  onPress
}: any): JSX.Element => {
  return (
    <View style={[styles.NavViewStyle, commonStyle.pad('l', 4), {alignItems: 'center'}]}>
      <Text style={{fontSize: ScreenUtil.setSpText(14), fontWeight: 'bold'}}>{title}</Text>
      <Icon name="arrow-right" size={12} />
    </View>
  )
}


const IconViewStyle: ViewStyle = {
  ...commonStyle.layout('center', 'center'),
  flex: 1,
  flexDirection: 'column',
};

const IconView: ViewStyle = {
  ...commonStyle.layout('center', 'center'),
  width: ScreenUtil.autoWidth(40),
  height: ScreenUtil.autoWidth(40),
  borderRadius: ScreenUtil.autoWidth(20),
  backgroundColor: UIColor.mainColor
};

export const NavIcon = ({
  name, 
  value,
  route,
  iconColor,
  textColor,
  background=true
}: {
  name: string;
  value: string;
  iconColor?: string;
  textColor?: string;
  background?: boolean;
  route?: string;
}): JSX.Element => {
  return (
    <TouchableOpacity style={IconViewStyle}>
      {
        background === true ? (
          <View style={IconView}>
            <Icon 
              name={name} 
              color={'#ffffff'}
              size={22}
            />
          </View>
        ) : (
          <Icon 
            name={name} 
            color={iconColor || '#ffffff'}
            size={22}
          />
        )
      }
      <Text style={[commonStyle.mar('t', 5), {fontSize: ScreenUtil.setSpText(12), color: textColor}]} >{value}</Text>
    </TouchableOpacity>
  );
}

const textViewStyle: TextStyle = {
  ...commonStyle.mar('t', 4),
  fontSize: ScreenUtil.setSpText(12),
};

class Discover extends React.Component<Props, State> {

  componentDidMount = () => {
    DiscoverController.banner();

    setTimeout(() => {
      DiscoverController.personalized();
    }, 2000);

    setTimeout(() => {
      DiscoverController.personalizedNewSong();
    }, 3000);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <ScrollView 
          style={{flex: 1}}
          contentContainerStyle={[
            commonStyle.pad('t', 10),
            commonStyle.pad('b', 64)
          ]}
        >  
          {this.renderBanners()}
          {this.renderNavbar()}
          {this.renderPlaylist()}
          {this.renderNewSong()}
        </ScrollView>
      </View>
    );
  }

  private renderBanners = () => {

    const SwiperViewStyle: ViewStyle = {
      width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
      height: ScreenUtil.autoHeight(150),
    };

    const SwiperSize: ImageStyle = {
      width: ScreenUtil.autoWidth(350), 
      height: ScreenUtil.autoHeight(150),
      borderRadius: ScreenUtil.autoHeight(10)
    };

    const { banners } = this.props;
    return (
      <View style={SwiperViewStyle}>
        <Swiper autoplay={true} autoplayTimeout={2000} >
          {
            banners && banners.map((image: any, index: number) => {
              return (
                <TouchableWithoutFeedback key={index}>
                  <View style={{flex: 1, ...commonStyle.layout('center', 'center')}}>
                    <Image
                      style={SwiperSize} 
                      source={{uri: image.imageUrl}} 
                      resizeMode="stretch"
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })
          }
        </Swiper>
      </View>
    );
  }

  private renderNavbar = (): JSX.Element => {

    return (
      <View style={styles.NavViewStyle}>
        <NavIcon name="speech" value="私人FM" />
        <NavIcon name="calendar" value="每日推荐" />
        <NavIcon name="playlist" value="歌单" />
        <NavIcon name="chart" value="排行榜 " />
      </View>
    );
  }

  private renderPlaylist = (): JSX.Element => {

    const PlaylistSize: any = {
      width: ScreenUtil.autoWidth(120),
      height: ScreenUtil.autoHeight(120),
    };

    const PlaylistViewStyle: ViewStyle = {
      ...commonStyle.mar('l', 4),
      ...commonStyle.mar('b', 10),
      width: ScreenUtil.autoWidth(120),
    };

    const ImageStyle: ImageStyle = {
      ...PlaylistSize,
    };

    const Playlist = ({ data }: any): JSX.Element => {
      return (
        <TouchableOpacity style={PlaylistViewStyle}>
          <ImageBackground
            source={{uri: data.picUrl}}
            resizeMode="cover"
            style={ImageStyle}
          >
            <View 
              style={{
                flexDirection: 'row',
                position: 'absolute',
                right: 2,
                top: 2
              }} 
            >
              <Icon name="earphones" color={UIColor.white} />
              <Text style={[textViewStyle, commonStyle.mar('l', 2), { color: UIColor.white }]} >{data.playCount}</Text>
            </View>
          </ImageBackground>
          <Text 
            style={textViewStyle}
            numberOfLines={2} 
          >
            {data.name}
          </Text>
        </TouchableOpacity>
      );
    }

    const { personalized } = this.props;

    const initPlaylist = new Array(6).fill({});

    return (
      <View style={[{flexDirection: 'column'}, commonStyle.mar('t', 20)]}>
        <RenderTitle title="推荐歌单"/>
        <View style={[styles.NavViewStyle, { flexWrap: 'wrap' }]}>
          {
            personalized && personalized.length > 0 
            ? personalized.slice(0, 6).map((playlist: any) => {
              return <Playlist key={playlist.id} data={playlist} />
            }) 
            : initPlaylist.map((item: any, index: number) => {
              return <View key={index} style={[styles.initPlaylistView, {...PlaylistSize} ]} />
            })
          }
        </View>
      </View>
    );
  }

  private renderNewSong = (): JSX.Element => {

    const SongSize: any = {
      width: ScreenUtil.autoWidth(120),
      height: ScreenUtil.autoHeight(120),
    };

    const PlaylistViewStyle: ViewStyle = {
      ...commonStyle.mar('l', 4),
      ...commonStyle.mar('b', 10),
      width: ScreenUtil.autoWidth(120),
    };

    const ImageStyle: ImageStyle = {
      ...SongSize,
    };

    const Song = ({data}: any): JSX.Element => {

      let artistsName: string[] = [];

      {
        data && data.song && data.song.artists
        ? data.song.artists.forEach((artist: any) => {
          artistsName.push(artist.name);
        })
        : artistsName = [];
      }

      return (
        <TouchableOpacity style={PlaylistViewStyle}>
          <Image
            source={{uri: data.song && data.song.album && data.song.album.picUrl}}
            resizeMode="cover"
            style={ImageStyle}
          />
          <Text 
            style={textViewStyle}
            numberOfLines={1} 
          >
            {data.name}
          </Text>
          {
            artistsName && artistsName.length > 0
            ? (
            <Text
              style={[textViewStyle, {color: UIColor.grayFont}]}
              numberOfLines={1} 
            >
              {artistsName.join(',')}
            </Text>
            )
            : null
          }
        </TouchableOpacity>
      );
    }

    const { personalizedNewSong } = this.props;

    return (
      <View style={[{flexDirection: 'column'}, commonStyle.mar('t', 20)]}>
        <RenderTitle title="最新音乐"/>
        <View style={[styles.NavViewStyle, { flexWrap: 'wrap' }]}>
          {
            personalizedNewSong && personalizedNewSong.length > 0 
            ? personalizedNewSong.slice(0, 6).map((song: any) => {
              return <Song key={song.id} data={song} />
            }) 
            : personalizedNewSong.map((item: any, index: number) => {
              return <View key={index} style={[styles.initPlaylistView, {...SongSize} ]} />
            })
          }
        </View>
      </View>
    );
  }
}

const styles: any = StyleSheet.create({
  NavViewStyle: {
    ...commonStyle.mar('t', 10),
    width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
    // height: ScreenUtil.autoHeight(60),
    flexDirection: 'row',
  },
  initPlaylistView: {
    ...commonStyle.mar('b', 4),
    ...commonStyle.mar('l', 4),
    backgroundColor: UIColor.grayAreaBor,
  }
});

const mapStateToProps = (state: Stores) => ({
  banners: getBanners(state),
  personalized: getPersonalized(state),
  personalizedNewSong: getPersonalizedNewSong(state),
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);