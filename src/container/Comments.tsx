import React from 'react';
import { Text, View, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Stores } from '../store/index';
import { Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderLeft } from '../component/Header';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import MediaController from '../action/MediaController';
import UserController from '../action/UserController';
import { getComments } from '../store/media';
import DismissKeyboardHOC from '../component/DismissKeyboardHOC';
import Validator from '../common/validator';
import invariant from '../common/invariant';
import Dialog from '../component/Dialog';
import moment from 'moment';

export const renderSingerName = ({song}: any) => {
  const artists: string[] = [];

  song && song.ar && song.ar.forEach((artist: any) => {
    artists.push(artist.name);
  });

  return artists.join(',');
}

const Comment = ({comment}: any) => {
  return (
    <View style={{flexDirection: 'column', marginTop: ScreenUtil.autoWidth(12)}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image 
          style={{width: ScreenUtil.autoWidth(40), height: ScreenUtil.autoWidth(40), borderRadius: ScreenUtil.autoWidth(20)}} 
          source={{uri: comment.imgUrl || ' '}} 
        />
        <View style={{marginLeft: ScreenUtil.autoWidth(10)}}>
          <Text style={{fontSize: ScreenUtil.setSpText(10)}}>{comment.nickName || ' '}</Text>
          <Text style={{fontSize: ScreenUtil.setSpText(10), color: UIColor.grayFont}}>{moment(comment.commentTime).format('YYYY-MM-DD HH:mm:ss')}</Text>
        </View>
      </View>

      <View style={{paddingLeft: ScreenUtil.autoWidth(50)}}>
        <Text 
          style={{width: ScreenUtil.autoWidth(300)}}
          numberOfLines={4}
        >
          {comment.commentContent || ' '}
        </Text>
      </View>
    </View>
  );
}

type Props = {
  navigation: NavigationScreenProp<any>;
  song: any;
  comments: any[];
};

type State = {
  value: string;
};

class Comments extends React.Component<Props, State> {

  state = {
    value: ''
  }

  static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<any> }) => {
    return {
      title: '评论',
      headerTitleStyle: {fontSize: ScreenUtil.setSpText(14), fontWeight: 'bold', color: UIColor.white},
      headerLeft: <HeaderLeft navigation={navigation}/>,
      headerStyle: {backgroundColor: UIColor.mainColor}
    };
  };

  componentDidMount() {
  
    this.init(); 
  }

  public init = () => {
    const { song } = this.props;
    const params = {
      musicId: song.id
    };
    MediaController.getSongComments(params);
  }

  public changeValueHandle = (text: string) => {
    this.setState({ value: text });
  }

  public checkAuth = () => {
    const helper = new Validator();
   
    helper.add(this.state.value, [{
      strategy: 'isNonEmpty',
      errorMsg: '快递公司不能为空',
      elementName: 'value',
    }]);

    const result = helper.start();

    if (result) {
      return { 
        success: false,
        result: result.errMsg
      };
    } else {
      return {
        success: true,
        result: { commentContent: this.state.value }
      };
    }
  }

  public doComment = () => {
    const { song } = this.props;

    const { success, result } = this.checkAuth();

    try {
      invariant(
        success,
        result || ' '
      );

      UserController.auth().then(async ({userDetail}) => {
        const payload = {
          ...result,
          musicId: song.id,
          userId: userDetail.profile.userId,
          commentTime: moment(),
          nickName: userDetail.profile.nickname,
          imgUrl: userDetail.profile.avatarUrl,
        };

        const { success: commentSuccess } = await MediaController.addComment(payload);

        invariant(
          commentSuccess,
          '发表评论失败'
        );

        Dialog.success('评论成功！');

        this.init();
      });
    } catch (error) {
      Dialog.showToast(error.message);
    }
  }

  render() {
    const { song, comments } = this.props;

    console.log('song: ', song);
    const paddingWidth: number = ScreenUtil.autoWidth(12);

    return (
      <View style={{flex: 1}}>
        <DismissKeyboardHOC style={{flex: 1}}>

          <ScrollView 
            style={{flex: 1}}
            contentContainerStyle={{
                ...commonStyle.pad('h', paddingWidth),
                ...commonStyle.pad('v', paddingWidth),
                paddingBottom: ScreenUtil.autoHeight(120),
            }}
          >
            <View 
              style={[
                {
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center'
                }
              ]}
            > 
              <Image 
                style={{width: ScreenUtil.autoWidth(80), height: ScreenUtil.autoWidth(80), borderRadius: ScreenUtil.autoWidth(5)}} 
                source={{uri: song.al && song.al.picUrl}} 
              />
              <View style={{marginLeft: paddingWidth}}>
                <Text style={{fontSize: ScreenUtil.setSpText(13), color: UIColor.titleBlack}}>{song.name}</Text>
                <Text style={{fontSize: ScreenUtil.setSpText(11), color: UIColor.mainColor, marginTop: paddingWidth}}>{renderSingerName({song})}</Text>
              </View>
              
            </View>
            <Text style={{fontSize: ScreenUtil.setSpText(13), color: UIColor.titleBlack, fontWeight: '500', marginTop: paddingWidth}}>精彩评论</Text>

            {
              comments && comments.length > 0 ? (
                comments.map((comment, index) => {
                  return (<Comment key={index} comment={comment} />)
                })
              ) : (
                <Text style={{marginTop: paddingWidth}}>暂无评论</Text>
              )
            }
          </ScrollView>

        </DismissKeyboardHOC>
        {this.renderFooter()}
      </View>
    )
  }

  private renderFooter = () => {
    return (
      <View 
        style={[
          {
            position: 'absolute',
            bottom: ScreenUtil.isIphoneX() === true ? 40: 10,
            flexDirection: 'row',
            alignItems: 'center'
          },
          commonStyle.pad('t', ScreenUtil.isIphoneX() === true ? ScreenUtil.autoHeight(20 + 20) : ScreenUtil.autoHeight(20 + 10)),
          commonStyle.pad('h', 15),
        ]}
      >
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
            <TextInput
              value={this.state.value}
              onChangeText={this.changeValueHandle}
              autoFocus={true}
              autoCapitalize="none"
              autoCorrect={false}
              style={[{width: ScreenUtil.autoWidth(200), fontSize: ScreenUtil.setSpText(15), color: UIColor.grayFont}, commonStyle.mar('l', 10)]} 
            />
          </View>
        </View>
        <TouchableOpacity style={commonStyle.mar('l', 10)} onPress={() => this.doComment()}>
          <Text style={{fontSize: ScreenUtil.setSpText(16), color: UIColor.titleBlack}} >评论</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state: Stores, ownProps: Props) => {
  const song = ownProps.navigation.getParam('song');

  return {
    song,
    comments: getComments(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);