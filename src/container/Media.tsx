import React from 'react'
import { Text, View, ViewStyle, StatusBar, StyleSheet, Image, findNodeHandle } from 'react-native'
import { commonStyle, UIColor } from '../common/style';
import Header from '../component/Header';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { BlurView } from 'react-native-blur';

type Props = {};

type State = {
  viewRef: any;
};

class Media extends React.Component<Props, State> {

  private backgroundImage: any;

  state = { viewRef: null };

  componentDidMount = () => {
    /**
     * @param {1.请求歌曲详情}
     */
  }

  public imageLoaded = () => {
    this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
  }

  render() {
    
    const containerViewStyle: ViewStyle = {
      flex: 1,
    };

    return (
      <View
        style={containerViewStyle}
      >
        <Image
          ref={(img) => { this.backgroundImage = img; }}
          source={{uri: 'https://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg'}}
          style={styles.absolute}
          onLoadEnd={this.imageLoaded.bind(this)}
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

    const headerContainerStyle: ViewStyle = {
      ...commonStyle.layout('center', 'center'),
      flexDirection: 'row',
    };

    const iconProps = {
      color: UIColor.white,
      size: 20
    }

    return (
      <View style={headerContainerStyle} >
        <View style={{flex: 1.5}}>
          <Icon name="arrow-left" {...iconProps} />
        </View>
        <View></View>
        <View></View>
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
    return (
      <View>
        <Text>renderFooter</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    top: 0, left: 0, bottom: 0, right: 0,
  }
});

export default Media;