import React, {Component} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import LottieAnimation from './Animation';

const screenW = Dimensions.get('window').width;
export default class LoadingView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
    };
  }

  render() {
    if (!this.state.showLoading) {
      return null;
    }
    return <View style={styles.loadStyle}>{this.state.showLoading && <LottieAnimation />}</View>;
  }

  showLoading(showType) {
    this.setState({
      showLoading: true,
      showType,
    });
  }

  dismissLoading() {
    this.setState({
      showLoading: false,
    });
  }
}
const styles = StyleSheet.create({
  loadStyle: {
    position: 'absolute',
    width: screenW,
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    display: this.state.display,
  },
});
