import React from 'react';
import { Text, View, ViewStyle, TextStyle, ScrollView, Image, ImageStyle } from 'react-native';
import { Header } from '../component';
import ScreenUtil, { UIColor, commonStyle } from '../common/style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { connect } from 'react-redux';
import { Stores } from '../store';
import { getUserdetail } from '../store/user';
import UserController from '../action/UserController';
import { AbstractParams } from '../action/actions';

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
};

class User extends React.Component<Props> {

  componentDidMount() {
    const params: AbstractParams = {
      param: {
        uid: 122141577
      }
    };
    UserController.userDeatail(params);
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

    const { userdetail } = this.props;

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

    return (
      <View style={UserViewStyle}>
        <View style={[SubView, {...commonStyle.pad('h', 10), ...commonStyle.pad('v', 10)}]}>
          <Image 
            source={{uri: userdetail.profile && userdetail.profile.avatarUrl}} 
            style={[UserImage, { ...commonStyle.mar('r', 10) }]}
          />
          <Text>{userdetail.profile && userdetail.profile.nickname}</Text>
        </View>
        <View style={[SubView]}>
          {
            userdetail.profile && userdetail.profile.eventCount ? (
              <PointItem data={{title: '动态', value: userdetail.profile.eventCount}} />
            ) : null
          }

          {
            userdetail.profile && userdetail.profile.follows ? (
              <PointItem data={{title: '关注', value: userdetail.profile.follows}} />
            ) : null
          }

          {
            userdetail.profile && userdetail.profile.followeds ? (
              <PointItem data={{title: '粉丝', value: userdetail.profile.followeds}} />
            ) : null
          }
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: Stores) => ({
  userdetail: getUserdetail(state),
});

export default connect(mapStateToProps)(User);