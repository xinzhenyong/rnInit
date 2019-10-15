import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setDp } from '../../utils/screenUtils';
import Header from '../../component/Header';

class My extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.bg}>
        <Header title="我的" showBack={false} showMessage={false} />
        <Text style={styles.plusStyle}>Count:{`${this.props.countReducer || 0}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeText: {
    fontSize: 30,
  },
  bg: { flex: 1 },
  plusStyle: {
    fontSize: setDp(30),
    color: 'red',
  },
});

export default connect((state) =>
  // console.log('state', state),
  ({
    countReducer: state.getCount,
  }),
)(My);
