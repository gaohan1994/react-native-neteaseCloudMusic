import React from 'react';
import { Text, View, ViewStyle, ViewProperties, StyleSheet } from 'react-native';
import ScreenUtil, { UIColor, commonStyle } from '../../common/style';
import Slider from 'react-native-slider';
import { MediaControll, getControll } from '../../store/player';
import { connect } from 'react-redux';
import { Stores } from '../store';
import { store } from '../../App';
import { CONTROLL_CURRENT_DETAIL } from '../../constants';
import numeral from 'numeral';

type Props = {
  controll: MediaControll;
} & ViewProperties;

class Progress extends React.Component<Props, any> {

  public sliderChange = (value: number) => {
    // console.log('sliderChange: ', value);
    // const { controll } = this.props;

    // store.dispatch({
    //   type: CONTROLL_CURRENT_DETAIL,
    //   payload: {
    //     controll: {
    //       sliderProgress: value,
    //       ff: numeral(controll.duration).value() * value
    //     }
    //   }
    // })
    // dispatch(setPlaySong({sliderProgress: value, ff: currentPlay.duration * value}));
  }

  public onSlidingStart = () => {
    store.dispatch({
      type: CONTROLL_CURRENT_DETAIL,
      payload: {
        controll: {
          paused: true,
        }
      }
    })
  }

  public onSlidingComplete = (value: number) => {
    console.log('sliderChange: ', value);
    const { controll } = this.props;

    store.dispatch({
      type: CONTROLL_CURRENT_DETAIL,
      payload: {
        controll: {
          sliderProgress: value,
          ff: numeral(controll.duration).value() * value,
        }
      }
    });

    setTimeout(() => {
      store.dispatch({
        type: CONTROLL_CURRENT_DETAIL,
        payload: {
          controll: {
            paused: false,
          }
        }
      })
    }, 100);
  }


  render() {
    const { controll } = this.props;

    const progressBarStyle: ViewStyle = {
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
    };

    return (

      <View style={progressBarStyle}>
        <Text style={styles.text} >{controll.currentTime}</Text>
        {this.renderBar()}
        <Text style={styles.text} >{controll.playTime}</Text>
      </View>
    );
  }

  private renderBar = (): JSX.Element => {

    const progressStyle: ViewStyle = {
      ...commonStyle.layout('center', 'space-around'),
      width: ScreenUtil.autoWidth(260),
    };

    const { controll } = this.props;

    return (
      <View 
        style={progressStyle}
        {...this.props.style}
      >
        <Slider
          disabled={false}
          maximumTrackTintColor={UIColor.white}
          minimumTrackTintColor={UIColor.mainColor}
          thumbStyle={styles.thumb}
          trackStyle={{height: ScreenUtil.autoHeight(2)}}
          style={{width: ScreenUtil.autoWidth(240)}}
          value={controll.sliderProgress}
          // value={.5}
          onSlidingStart={this.onSlidingStart}
          onSlidingComplete={this.onSlidingComplete}
          onValueChange={(value: number) => this.sliderChange(value)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: UIColor.mainColor,
    borderColor: UIColor.white,
    borderWidth: 7,
    borderRadius: 10,
  },
  text: {
    color: UIColor.white,
  },
});



const mapStateToProps = (state: Stores) => {
  const controll = getControll(state);
  return {
    controll,
  };
};
export default connect(mapStateToProps)(Progress);