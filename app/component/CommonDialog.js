import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { setDp } from '../utils/screenUtils';
import warnning from '../assest/warnning.png';

const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;
export default class CommonDialog extends Component {
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
                width: setDp(373),
                minHeight: setDp(270),
                backgroundColor: '#ffffff',
                borderRadius: setDp(8),
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: setDp(33),
                  alignContent: 'center',
                }}>
                <Image
                  source={warnning}
                  style={{
                    width: setDp(48),
                    height: setDp(48),
                    alignSelf: 'center',
                  }}
                />
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginTop: setDp(15),
                  alignContent: 'center',
                  paddingLeft: setDp(44),
                  paddingRight: setDp(44),
                }}>
                <Text
                  style={{
                    fontSize: setDp(22),
                    color: '#101010',
                    textAlign: 'center',
                    minHeight: setDp(80),
                  }}>
                  {alertText}
                </Text>
              </View>
              <View style={{ flex: 1 }} />
              {cancle ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#EEEEEE',
                    minHeight: setDp(65),
                    marginTop: setDp(17),
                    borderBottomLeftRadius: setDp(8),
                    borderBottomRightRadius: setDp(8),
                  }}>
                  <TouchableOpacity
                    onPress={() => this.closeDialog()}
                    style={{
                      flex: 1,
                      borderWidth: 1,
                      borderColor: '#f5f5f5',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomLeftRadius: setDp(8),
                    }}>
                    <Text style={styls.textStyle}>取消</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.submit()}
                    style={{
                      flex: 1,
                      backgroundColor: '#fecd0b',
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderBottomRightRadius: setDp(8),
                    }}>
                    <Text style={styls.textStyle}>{submitText}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() => this.submit()}
                  style={{
                    flex: 1,
                    backgroundColor: '#fecd0b',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: setDp(17),
                    minHeight: setDp(65),
                    borderBottomLeftRadius: setDp(8),
                    borderBottomRightRadius: setDp(8),
                  }}>
                  <Text style={styls.textStyle}>{submitText}</Text>
                </TouchableOpacity>
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
