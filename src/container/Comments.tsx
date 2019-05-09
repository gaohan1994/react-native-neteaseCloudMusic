import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import { Dispatch } from 'redux';

type Props = {

};

type State = {

};

class Comments extends React.Component<Props, State> {

  componentDidMount() {
    const { } = this.props;
  }

  render() {
    return (
      <View>
        <Text> Comments </Text>
      </View>
    )
  }
}

const mapStateToProps = (state: Stores) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);