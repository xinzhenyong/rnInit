import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { setDp } from '../../utils/screenUtils';
import { add } from '../order/redux/CountReducer';

const { Download } = NativeModules;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount(){
    console.log('Download',Download);
  }

  render() {
    return (
      <View style={styles.bg}>
        <Text style={styles.homeText}>Home</Text>
        <TouchableOpacity
          onPress={() => {
            this.props.count();
          }}>
          <Text style={styles.plusStyle}>plus {`${this.props.countReducer || 0}`}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeText: {
    fontSize: 30,
  },
  bg: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  plusStyle: {
    fontSize: setDp(30),
    color: 'red',
  },
});

export default connect(
  (state) =>
    // console.log('state', state),
    ({
      countReducer: state.getCount,
    }),
  (dispatch) => ({
    count: () => dispatch(add()),
  }),
)(Home);
