import React, { Dispatch } from 'react';
import { Text, View, ViewStyle, TextStyle, ScrollView, Image, ImageStyle, TouchableOpacity } from 'react-native';
import { Header } from '../component';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { Stores } from '../store';
import { getUserdetail, getUserinfo } from '../store/user';
import UserController from '../action/UserController';
import { AbstractParams } from '../action/actions';
import NavigationService from '../NavigationService';
import StatusControll from '../action/StatusControll';

interface RowItemProps {
  name: string;
  title: string;
  subTitle?: string;
  subName?: string;
}

const Item = ({data}: {data: RowItemProps}): JSX.Element => {
  const ItemView: ViewStyle = {
    ...commonStyle.layout('center', 'space-between', 'row'),
    ...commonStyle.pad('h', 10),
    ...commonStyle.pad('v', 10),
    width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
  };

  const SubView: ViewStyle = {
    ...commonStyle.layout('center', '', 'row'),
  };

  const IconProps = {
    size: 22,
  };

  const RowTextStyle: TextStyle = {
    ...commonStyle.mar('l', 10),
    fontSize: ScreenUtil.setSpText(13),
  };

  return (
    <View style={ItemView} >
      <View style={SubView}>
        <Icon name={data.name} {...IconProps} />
        <Text style={RowTextStyle}>{data.title}</Text>
      </View>
      {
        data.subName ? (
          <View style={SubView}>
            <Icon name={data.subName} />
            <Text>{data.subTitle}</Text>
          </View>
        ) : null
      }
    </View>
  )
}

const Group = ({datas}: {datas: RowItemProps[]}) => {
  const GroupView: ViewStyle = {
    borderTopWidth: ScreenUtil.autoHeight(5),
    borderTopColor: UIColor.grayBorder,
  };
  return (
    <View style={GroupView}>
      {
        datas.map((data: any, index: number) => {
          return <Item key={index} data={data} />
        })
      }
    </View>
  );
}

type Props = {
  userdetail: any;
  userinfo: any;
  dispatch: Dispatch<any>;
};

class User extends React.Component<Props> {

  componentDidMount() {
    const params: AbstractParams = {
      param: {
        uid: 122141577
      }
    };
    // UserController.userDeatail(params);
  }

  public register = () => {
    NavigationService.navigate({routeName: 'Register'});
  }

  public login = () => {
    const { dispatch } = this.props;
    const params = {
      dispatch,
      showLogin: true
    };

    StatusControll.changeLoginModal(params);
  }

  render() {

    const groups: RowItemProps[][] = [
      [
        {
          title: '我的消息',
          name: "envelope"
        }
      ],
      [
        {
          title: '会员中心',
          name: "social-steam"
        },
        {
          title: '商城',
          name: "basket-loaded"
        },
      ],
      [
        {
          title: '设置',
          name: "settings"
        },
        {
          title: '扫一扫',
          name: "frame"
        },
        {
          title: '关于',
          name: "question"
        },
      ],
    ];

    return (
      <View style={{flex: 1}}>
        <Header />

        <ScrollView
          style={{flex: 1}}
        >
          {this.renderUser()}
          {
            groups.map((group: RowItemProps[], index: number) => {
              return <Group key={index} datas={group} />
            })
          }
        </ScrollView>
      </View>
    )
  }

  private renderUser = () => {

    const { userinfo } = this.props;

    const UserViewStyle: ViewStyle = {
      ...commonStyle.layout('', '', 'column'),
      width: ScreenUtil.autoWidth(ScreenUtil.uiWidth),
    };

    const UserImage: ImageStyle = {
      width: ScreenUtil.autoWidth(60),
      height: ScreenUtil.autoHeight(60),
      borderRadius: ScreenUtil.autoWidth(30),
    };

    const SubView: ViewStyle = {
      ...commonStyle.layout('center', '', 'row'),
    };

    const PointItem = ({data}: any) => {
      const PointViewStyle: ViewStyle = {
        ...commonStyle.layout('center', 'center', 'column'),
        ...commonStyle.pad('v', 10),
        ...commonStyle.bor('t', 1),
        flex: 1,
      };

      return (
        <View style={PointViewStyle}>
          <Text>{data.title}</Text>
          <Text>{data.value}</Text>
        </View>
      );
    }

    if (userinfo && userinfo.username) {
      return (
        <View style={UserViewStyle}>
          <View style={[SubView, {...commonStyle.pad('h', 10), ...commonStyle.pad('v', 10)}]}>
            <Image 
              source={{uri: 'https://p1.music.126.net/WDJExxtG8RiHU_oSuyclFA==/3274345636864077.jpg'}} 
              style={[UserImage, { ...commonStyle.mar('r', 10) }]}
            />
            <Text>{userinfo.username}</Text>
          </View>
          <View style={[SubView]}>
            <PointItem data={{title: '动态', value: 0}} />
            <PointItem data={{title: '关注', value: 0}} />
            <PointItem data={{title: '粉丝', value: 0}} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={UserViewStyle}>
          <TouchableOpacity 
            style={[SubView, {...commonStyle.pad('h', 10), ...commonStyle.pad('v', 10)}]}
            onPress={() => this.register()}
          >
            
            <Text>注册</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[SubView, {...commonStyle.pad('h', 10), ...commonStyle.pad('v', 10)}]}
            onPress={() => this.login()}
          >
            
            <Text>登录</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const mapStateToProps = (state: Stores) => ({
  userdetail: getUserdetail(state),
  userinfo: getUserinfo(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(User);