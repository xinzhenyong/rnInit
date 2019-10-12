import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import My from './my/My';
import Home from './home/Home';
import Order from './order/Order';
import {setDp} from '../utils/screenUtils';

const dataSource = [
  {
    icon: require('../assest/qiangdan-mo.png'),
    selectedIcon: require('../assest/qiangdan-dian.png'),
    tabPage: 'Home',
    tabName: '主页',
    component: Home,
  },
  {
    icon: require('../assest/dingdan-mor.png'),
    selectedIcon: require('../assest/dingdan-dian.png'),
    tabPage: 'Order',
    tabName: '订单',
    component: Order,
  },
  {
    icon: require('../assest/gerenzx-mo.png'),
    selectedIcon: require('../assest/gerenzx-dian.png'),
    tabPage: 'My',
    tabName: '我的',
    component: My,
  },
];

const screenW = Dimensions.get('window').width;

export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'Home',
    };
  }

  render() {
    let {} = this.state;
    const {navigation} = this.props;
    const tabViews = dataSource.map((item, i) => {
      this.title = item.tabName;
      return (
        <TabNavigator.Item
          title={!(i === 0 && this.state.selectedTab === 'Home') ? this.title : null}
          selected={this.state.selectedTab === item.tabPage}
          titleStyle={{color: 'black', fontSize: setDp(20)}}
          selectedTitleStyle={{color: '#101010'}}
          renderIcon={() => <Image style={styles.tabIcon} source={item.icon} />}
          renderSelectedIcon={() => (
            <Image
              style={[styles.tabCheckIcon, i === 0 && this.state.selectedTab === 'Home' && styles.checkOrderStall]}
              source={item.selectedIcon}
            />
          )}
          tabStyle={{alignSelf: 'center'}}
          onPress={() => {
            this.select(item);
          }}
          key={i}>
          <item.component navigation={navigation} />
        </TabNavigator.Item>
      );
    });
    return (
      <View style={styles.container}>
        <TabNavigator hidesTabTouch={true}>{tabViews}</TabNavigator>
      </View>
    );
  }

  UNSAFE_componentWillMount() {}

  componentWillUnmount() {}

  select(item) {
    this.setState({selectedTab: item.tabPage});
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabIcon: {
    width: setDp(27),
    height: setDp(25),
  },
  tabCheckIcon: {
    width: setDp(27),
    height: setDp(25),
  },
  checkOrderStall: {
    width: setDp(57),
    height: setDp(57),
  },
});
