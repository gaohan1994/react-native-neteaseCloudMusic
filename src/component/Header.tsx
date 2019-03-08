import React from 'react';
import { Text, View, ViewProperties, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import NavigationService from '../NavigationService';
import { NavigationScreenProp } from 'react-navigation';

function defaultNavigationBackHandle (navigation: NavigationScreenProp<any>) {
  console.log('navigation: ', navigation);
  navigation.goBack();
}

export const HeaderLeft = ({navigation, onPress}: { navigation: NavigationScreenProp<any>; onPress?: () => void }) => {
  return (
    <TouchableOpacity 
      onPress={onPress ? onPress : () => defaultNavigationBackHandle(navigation)} 
      style={{paddingLeft: ScreenUtil.autoWidth(15)}}
    >
      <Icon 
        size={16}
        name="arrow-left"
        color="#ffffff"
      />
    </TouchableOpacity>
  );
}

type Props = {
  content?: JSX.Element;
} & ViewProperties;

type State = {};

class Header extends React.Component<Props, State> {

  static HeaderHeight: number = ScreenUtil.isIphoneX() === true 
    ? ScreenUtil.autoHeight(64 + 20) 
    : ScreenUtil.autoHeight(64);

  render() {

    const containerStyle: ViewStyle = {
      ...styles.container,
      ...commonStyle.pad('t', ScreenUtil.isIphoneX() === true ? 30 : 15),
    }

    const { content } = this.props;

    return (
      <View
        style={containerStyle}
        {...this.props.style}
      >
        {
          content ? content : this.renderContent()
        }
      </View>
    )
  }

  private renderContent = (): JSX.Element => {

    const contentStyle: ViewStyle = {
      ...commonStyle.layout('center', 'center'),
      flex: 1,
      flexDirection: 'row',
    };

    const searchInputStyle: ViewStyle = {
      ...commonStyle.layout('center', 'center'),
      backgroundColor: 'rgba(255, 255, 255, .2)',
      flexDirection: 'row',
      width: ScreenUtil.autoWidth(280),
      height: ScreenUtil.autoHeight(30),
      borderRadius: ScreenUtil.autoHeight(15),
    };
    
    return (
      <View style={[contentStyle]} >
        <TouchableOpacity onPress={() => this.onSearchPress()}>
          <View style={searchInputStyle}>
            <Icon name="magnifier" color={UIColor.white} />
            <Text style={styles.searchText} >大家都在搜 有可能的夜晚</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  private onSearchPress = () => {
    NavigationService.navigate({routeName: 'Search'});
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
    height: Header.HeaderHeight,
    backgroundColor: UIColor.mainColor,
  },
  searchText: {
    color: UIColor.white,
    fontSize: ScreenUtil.setSpText(12),
    marginLeft: ScreenUtil.autoWidth(8)
  }
});

export default Header;
