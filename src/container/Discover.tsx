import React from 'react';
import { Text, View, ScrollView, TouchableWithoutFeedback, Image, ViewStyle, ImageStyle } from 'react-native';
import Header from '../component/Header';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import Swiper from 'react-native-swiper';
import DiscoverController from '../action/DiscoverController';
import { Stores } from '../store/index';
import { connect } from 'react-redux';
import { getBanners } from '../store/discover';

type Props = {
  banners: any[];
};

type State = {};

class Discover extends React.Component<Props, State> {

  componentDidMount = () => {
    DiscoverController.banner();
  }
  

  render() {
    return (
      <View style={{flex: 1}}>
        <Header />
        <ScrollView 
          style={{flex: 1}}
          contentContainerStyle={commonStyle.pad('t', 10)}
        >  
          {this.renderBanners()}
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
            banners && banners.length > 0 ? banners.map((image: any, index: number) => {
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
            }) : <View></View>
          }
        </Swiper>
      </View>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  banners: getBanners(state),
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Discover);