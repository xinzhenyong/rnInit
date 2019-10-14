import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Dimensions, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {setDp} from '../utils/screenUtils';
import backImage from '../assest/fanhui.png';
import messageImage from '../assest/message.png';

const screenW = Dimensions.get('window').width;
/** 公共的顶部标题栏 */
export default class Header extends Component {
  static defaultProps = {
    title: '标题', //标题
    navigation: PropTypes.object, //导航
    showBack: true, //是否显示返回键
    showMessage: true, //是否显示消息
    unreadRecord: 0, //未读消息数
    headerStyle: {}, //自定义的头部样式
  };

  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={this.props.headerStyle}>
        <View style={styles.headerView}>
          {this.props.showBack ? (
            <TouchableOpacity
              onPress={() => (this.props.backPress ? this.props.backPress() : goBack())}
              style={styles.leftBtn}>
              <Image source={backImage} style={{width: setDp(10), height: setDp(20)}} />
            </TouchableOpacity>
          ) : (
            <View style={styles.leftBtn} />
          )}
          <View style={styles.titleStyle}>
            <Text style={styles.title}> {this.props.title} </Text>
          </View>
          <View style={styles.rightBtnFirst}>
            {this.props.rightBtnFirst}
            {this.props.showMessage ? (
              <TouchableOpacity onPress={() => this.seeMessage()} style={styles.rightBtn}>
                <Image source={messageImage} style={styles.messageImage} />
                {this.props.unreadRecord > 0 ? (
                  <View style={styles.messageUnRead}>
                    <Text style={styles.messageUnReadText}>
                      {this.props.unreadRecord > 99 ? 99 : this.props.unreadRecord}
                    </Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            ) : (
              <View style={styles.rightBtn} />
            )}
          </View>
        </View>
      </View>
    );
  }

  seeMessage() {
    this.props.navigation && this.props.navigation.navigate('SummaryMessageRecord');
  }
}

const styles = StyleSheet.create({
  messageUnReadText: {
    fontSize: setDp(8),
    color: '#fff',
  },
  messageUnRead: {
    backgroundColor: 'red',
    borderRadius: 360,
    padding: setDp(5),
    alignItems: 'center',
    justifyContent: 'center',
    width: setDp(23),
    height: setDp(23),
    position: 'absolute',
    right: setDp(10),
  },
  messageImage: {width: setDp(20), height: setDp(25), marginLeft: setDp(25), resizeMode: 'contain'},
  rightBtnFirst: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleStyle: {
    position: 'relative',
    alignSelf: 'center',
    alignContent: 'center',
  },
  headerView: {
    width: screenW,
    height: setDp(85),
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: setDp(23),
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 0.3,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0.1},
    alignItems: 'center',
  },
  title: {
    fontSize: setDp(24),
    color: '#333333',
    fontWeight: '900',
  },
  leftBtn: {
    flex: 1,
    width: setDp(65),
    height: setDp(35),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: setDp(25),
  },
  rightBtn: {
    alignContent: 'center',
    justifyContent: 'center',
    width: setDp(65),
    height: setDp(35),
  },
});
