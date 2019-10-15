import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { setDp } from '../utils/screenUtils';

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
export default class GlobalDialog extends Component {
  /**
   * onlyClickBtn  false则能通过点击弹窗外区域关闭弹窗
   */
  static propTypes = {
    showAlert: PropTypes.bool,
    submitFunc: PropTypes.func,
  };

  static defaultProps = {
    onlyClickBtn: true,
    alertText: 'this alert',
    showDialog: false,
    cancle: false,
    backgroundColor: 'rgba(0,0,0,0.3)',
    submitText: '确定',
  };

  constructor(props) {
    super(props);
    this.state = {
      showDialog: this.props.showDialog,
      submit: this.props.submitFunc,
      alertText: this.props.alertText,
      submitText: this.props.submitText,
      cancle: this.props.cancle,
    };
  }

  render() {
    const { alertText, submitText, cancle } = this.state;
    const { onlyClickBtn, backgroundColor } = this.props;
    if (!this.state.showDialog) {
      return null;
    }
    return (
      <View
        style={{
          position: 'absolute',
          flex: 1,
          width: screenW,
          height: screenH,
          backgroundColor,
        }}>
        <TouchableWithoutFeedback
          onPress={() => (onlyClickBtn ? null : this.closeDialog())}>
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View
              style={{
                width: setDp(350),
                height: setDp(260),
                backgroundColor: '#ffffff',
                borderRadius: setDp(8),
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: setDp(20),
                  alignContent: 'center',
                  height: setDp(20),
                }}>
                <Text
                  style={{
                    fontSize: setDp(24),
                    color: '#111111',
                    textAlign: 'center',
                  }}>
                  提示
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: setDp(15),
                  alignContent: 'center',
                  height: setDp(150),
                }}>
                <Text
                  style={{
                    fontSize: setDp(24),
                    color: '#101010',
                    textAlign: 'center',
                  }}>
                  {alertText}
                </Text>
              </View>
              {cancle ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: setDp(25),
                  }}>
                  <TouchableOpacity
                    onPress={() => this.closeDialog()}
                    style={{
                      width: setDp(140),
                      borderWidth: 1,
                      borderColor: '#f5f5f5',
                      borderRadius: setDp(25),
                      paddingVertical: setDp(6),
                    }}>
                    <Text style={styls.textStyle}>取消</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.submit()}
                    style={{
                      width: setDp(140),
                      backgroundColor: '#fecd0b',
                      borderRadius: setDp(25),
                      paddingVertical: setDp(6),
                    }}>
                    <Text style={styls.textStyle}>{submitText}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={{ paddingHorizontal: setDp(25) }}>
                  <TouchableOpacity
                    onPress={() => this.submit()}
                    style={{
                      backgroundColor: '#fecd0b',
                      borderRadius: setDp(25),
                      paddingVertical: setDp(6),
                    }}>
                    <Text style={styls.textStyle}>{submitText}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  submit() {
    this.closeDialog();
    if (this.state.submit) {
      this.state.submit();
    }
  }

  showDialog = (fun = null, showText, btntext = '确定', cancle = true) => {
    this.setState({
      showDialog: true,
      alertText: showText,
      submitText: btntext,
      cancle,
    });
    if (fun) {
      this.setState({
        submit: fun,
      });
    } else {
      this.setState({
        showDialog: false,
      });
    }
  };

  closeDialog = () => {
    this.setState({
      showDialog: false,
    });
    // this.props.cancleDialog()
  };
}

const styls = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    color: '#101010',
    fontSize: setDp(24),
  },
});
