import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../component/Header';
import { setDp } from '../../utils/screenUtils';

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goToTest() {
    this.props.navigation.navigate('Test');
  }

  render() {
    return (
      <View style={styles.bg}>
        <Header title="订单" showBack={false} showMessage={false} />
        <TouchableOpacity
          style={styles.jump}
          onPress={() => {
            this.goToTest();
          }}>
          <Text style={styles.jumpText}>跳转到列表界面</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  jumpText: {
    color: 'red',
    fontSize: setDp(30),
  },
  bg: { flex: 1 },
  jump: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
