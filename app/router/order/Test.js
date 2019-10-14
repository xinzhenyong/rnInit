import React, {Component} from 'react';
import {View, Text, FlatList, RefreshControl, StyleSheet} from 'react-native';
import Header from '../../component/Header';
import {API_VERSION} from '../../config';
import FetchUtils from '../../utils/fetch';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: [],
    };
  }

  componentWillMount() {
    this.loadData(true);
  }

  loadData(isRefresh) {
    FetchUtils.postNoVerification(`basedata/${API_VERSION}/api/area/findAppAreaList`, {})
      .then((result) => {
        console.log(result);

        if (result.code === 2000) {
          this.setState({
            data: result.data,
          });
        }
      })
      .catch(() => {});
  }

  renderRow(data) {
    let value = data.item;
    return <Text>{value.name}</Text>;
  }

  render() {
    return (
      <View style={styles.bg}>
        <Header showBack={true} title="列表" showMessage={false} navigation={this.props.navigation} />
        <FlatList
          // ItemSeparatorComponent={this.separatorComponent}
          data={this.state.data}
          renderItem={(data) => this.renderRow(data)}
          keyExtractor={(item) => `${item.id}`}
          //   ListEmptyComponent={() => this.listEmptyComponent()}
          onEndReachedThreshold={0.8}
          onEndReached={() => this.loadData(true)}
          refreshControl={
            <RefreshControl
              title="加载中..."
              titleColor="black"
              colors={['#FECD0B']}
              refreshing={this.state.isLoading}
              onRefresh={() => this.loadData(false)}
              tintColor="#FECD0B"
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});
