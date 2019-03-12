/**
 * Created by Ghan on 2018-5-31
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import TabNavigator from 'react-native-tab-navigator';
import { 
    Video,
    Discover,
    Friends,
    User,
    Mine,
} from './container';
import ScreenUtil, { UIColor } from './common/style';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

interface MianTabProps {
    navigation: NavigationScreenProp<any>;
}
interface MianTabState {
    selectedTab: string;
}

class MianTab extends React.Component <MianTabProps, MianTabState> {
    state = { selectedTab: '发现' };

    componentWillReceiveProps = (nextProps: MianTabProps) => {
        if (
            nextProps.navigation.state.params && 
            nextProps.navigation.state.params.entry &&
            nextProps.navigation.state.params.entry === 'Logout'
        ) {
            /**
             * @param {如果退出登录那么重置首页}
             */
            this.setState({ selectedTab: '发现' });
        }
    }

    public onPressHandle = (selectedTab: string) => {
        switch (selectedTab) {
            default:
                this.setState({ selectedTab: selectedTab });
                return;
        }
    }

    public onScanClickHandle = () => {
        const { navigation: { navigate } } = this.props;
        navigate('Camera', { entry: 'MainTab' });
    }

    render () {
        
        return (
            <TabNavigator
                tabBarShadowStyle={{height: 0}}
                tabBarStyle={{
                    backgroundColor: '#ffffff',
                    height: ScreenUtil.autoHeight(ScreenUtil.isIphoneX() === true ? 33 + 49 : 49),
                    paddingBottom: ScreenUtil.autoHeight(ScreenUtil.isIphoneX() === true ? 33 : 0)
                }}
            >
                {this._renderTabarItems('发现', 'music-tone', 'music-tone', Discover)}
                {this._renderTabarItems('视频', 'social-youtube', 'social-youtube', Video)}
                {this._renderTabarItems('我的', 'music-tone-alt', 'music-tone-alt', Mine)}
                {/* {this._renderTabarItems('朋友', 'people', 'people', Friends)} */}
                {this._renderTabarItems('账号', 'user', 'user', User)}
            </TabNavigator>
        );
    }

    private _renderTabarItems = (selectedTab: string, icon: any, selectedIcon: any, ChildComponent: any): JSX.Element => {

        const selected: boolean = this.state.selectedTab === selectedTab;

        const iconStyle = {
            size: 22,
            color: selected === true ? UIColor.mainColor : UIColor.grayFont,
        };

        return (
            <TabNavigator.Item
                selected={selected}
                title={selectedTab}
                titleStyle={styles.tabText}
                selectedTitleStyle={styles.selectedTabText}
                renderIcon={() => <Icon {...iconStyle} name={icon} />}
                renderSelectedIcon={() => <Icon {...iconStyle} name={selectedIcon} />}
                onPress={() => this.onPressHandle(selectedTab)}
            >
                {ChildComponent ?  <ChildComponent navigation={ this.props.navigation }/> : null} 
            </TabNavigator.Item>
        );
    }
}

const styles: any = StyleSheet.create({
    tabText: {
        color: UIColor.grayFont,
        fontSize: 12
    },
    selectedTabText: {
        color: UIColor.mainColor
    },
    icon: {
        width: ScreenUtil.autoWidth(20),
        height: ScreenUtil.autoWidth(22),
    },
    scan: {
        width: ScreenUtil.autoWidth(60),
        height: ScreenUtil.autoHeight(48),
        zIndex: 99
    }
});

export default MianTab;