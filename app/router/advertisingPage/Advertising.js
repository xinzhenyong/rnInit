import React, {Component} from 'react';
import {View} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import {connect} from 'react-redux';
// import {userInfo} from '../../../actions/UserInfo';
import {ACCESS_TOKEN} from '../../config';
import Storage from '../../utils/Storage';

/** 启动过渡页 */
class Advertising extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <View />;
  }

  UNSAFE_componentWillMount() {
    Storage.get(ACCESS_TOKEN)
      .then((result) => {
        result = 'test';
        if (result && result !== '') {
          // this.props.userInfo(this.props.navigation, true);
          this.gotoHome();
        } else {
          this.gotoLogin();
        }
      })
      .catch(() => {
        this.gotoLogin();
      });
  }

  gotoHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'TabNavigator'})],
    });
    this.props.navigation.dispatch(resetAction);
  }

  gotoLogin() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})],
    });
    this.props.navigation.dispatch(resetAction);
  }
}

export default connect(
  () => ({}),
  (dispatch) => ({
    // userInfo: (navigation, status) => dispatch(userInfo(navigation, status)),
  }),
)(Advertising);
