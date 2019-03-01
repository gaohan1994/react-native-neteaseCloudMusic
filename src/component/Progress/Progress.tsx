import React from 'react';
import { Text, View, ViewStyle, ViewProperties } from 'react-native';
import ScreenUtil from '../../common/style';

type Props = {} & ViewProperties;

class Progress extends React.Component<Props, any> {
  render() {
    const { } = this.props;

    const progressBarStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
    };

    return (

      <View style={progressBarStyle}>
        <Text>01:28</Text>
        {this.renderBar()}
        <Text>04:10</Text>
      </View>
    );
  }

  private renderBar = (): JSX.Element => {

    const progressStyle: ViewStyle = {
      width: ScreenUtil.autoWidth(260),
      backgroundColor: '#ffffff'
    };

    return (
      <View 
        style={progressStyle}
        {...this.props.style}
      >
        <Text> Progress </Text>
      </View>
    );
  }
}

export default Progress;