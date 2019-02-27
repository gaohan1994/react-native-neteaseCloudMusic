import React from 'react';
import { Text, View, ScrollView, ViewStyle, StyleSheet } from 'react-native';
import Header from '../component/Header';
import SearchController from '../action/SearchController';
import ScreenUtil, { commonStyle, UIColor } from '../common/style';
import { Button } from 'teaset';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import { getHots } from '../store/search';

type Props = {
  hots: any[];
};

type State = {};

class Search extends React.Component<Props, State> {

  componentDidMount() {
    SearchController.searchHot();
  }

  render() {
    const mainScrollViewStyle: ViewStyle = {
      flex: 1
    };

    return (
      <View style={{flex: 1}}>
        <Header content={this.renderHeader()} />

        <ScrollView style={mainScrollViewStyle} >
          <View style={[mainScrollViewStyle]}>
            {this.renderSearchHot()}
          </View>
        </ScrollView>
      </View>
    )
  }

  private renderHeader = (): JSX.Element => {
    return (
      <View>
        <Text>hahaha</Text>
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
});

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Search);