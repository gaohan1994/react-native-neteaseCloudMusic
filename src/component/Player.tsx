import React from 'react';
import Video, { VideoProperties, OnLoadData } from 'react-native-video';
import { Stores } from '../store/index';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getCurrentSongDetail, getControll, MediaControll, getPlayerSongs } from '../store/player';
import MediaController from '../action/MediaController';
import { DispatchAbstract } from '../action/actions';
import { mergeProps } from '../common/config';
import Actions from '../action/actions';
import { CONTROLL_CURRENT_DETAIL } from '../constants';
import numeral from 'numeral';

/**
 * All rights reserved.
 *
 * 添加注释
 *
 */
export const transTime = (time: any) => {
  const minute = Math.floor(time / 60);
  const second = Math.floor(time % 60);
  return `${minute > 10 ? minute : (`0${minute}`)}:${second > 9 ? second : ('0' + second)}`
};

interface VideoPlayerProps extends VideoProperties {
  currentSong: any;
  controll: MediaControll;
  dispatch: Dispatch;
}

type Props = Partial<VideoPlayerProps>;

type State = {};

class Player extends React.Component<Props, State> {

  private player?: Video;

  constructor(props: Props) {
    super(props);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { currentSong, controll } = this.props;
    const { currentSong: nextSong, controll: nextControll } = nextProps;

    if (currentSong.id !== nextSong.id) { 
      /**
       * @param {换歌了}
       */
      this.getMusicUrl(nextSong.id);
    }

    if (this.player && controll && nextControll && controll.ff !== nextControll.ff) {
      this.player.seek(nextControll.ff);
    }
  }

  getMusicUrl = (id: any) => {

    if (this.props.dispatch) {
      const payload: DispatchAbstract<any> = {
        dispatch: this.props.dispatch,
        param: { ids: [id] }
      };
      MediaController.getSongUrl(payload);
    }
  };

  public loadStart = () => {

  }

  public setDuration = (data: OnLoadData) => {
    console.log('data: ', data);
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: CONTROLL_CURRENT_DETAIL,
        payload: {
          controll: {
            duration: data.duration,
            playTime: transTime(data.duration)
          }
        }
      })
    }
  }

  public setTime = (time: any) => {
    const { dispatch, controll } = this.props;
    if (dispatch && controll) {
      dispatch({
        type: CONTROLL_CURRENT_DETAIL,
        payload: {
          controll: {
            currentTime: transTime(time.currentTime), 
            sliderProgress: time.currentTime / numeral(controll.duration).value()
          }
        }
      });
    }
  }

  public onEnd = () => {
    
    MediaController.nextSong();

    Player
  }

  public videoError = () => {

  }

  public onBuffer = () => {

  }

  public onTimedMetadata = () => {

  }

  render() {
    const { currentSong, controll } = this.props;

    return (
      currentSong && currentSong.url && currentSong.url.url && controll ? (
        <Video
          source={{uri: currentSong.url.url}}                // Can be a URL or a local file.
          ref={(ref: any) => { this.player = ref }}    // Store reference
          rate={1.0}                              // 0 is paused, 1 is normal.
          volume={1.0}                            // 0 is muted, 1 is normal.
          muted={false}                           // Mutes the audio entirely.
          paused={controll.paused}                // Pauses playback entirely.
          // paused={true}
          resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
          repeat={true}                           // Repeat forever.
          playInBackground={true}                 // Audio continues to play when app entering background.
          playWhenInactive={false}                // [iOS] Video continues to play when control or notification center are shown.
          progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
          ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
          onLoadStart={this.loadStart}            // Callback when video starts to load
          onLoad={this.setDuration}               // Callback when video loads
          onProgress={this.setTime}               // Callback every ~250ms with currentTime
          onEnd={this.onEnd}                      // Callback when playback finishes
          onError={this.videoError}               // Callback when video cannot be loaded
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
          style={{width: 0, height: 0}}
          {...this.props}
        />
      ) : null
    )
  }
}

const mapStateToProps = (state: Stores) => ({
  currentSong: getCurrentSongDetail(state),
  controll: getControll(state),
  // playerSongs: getPlayerSongs(state),
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Player);