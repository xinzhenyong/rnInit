import React, {Component} from 'react';
import Animation from 'lottie-react-native';

export default class LottieAnimation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Animation
        ref={ref => {
          this.animation = ref;
        }}
        style={{
          width: 200,
          height: 200,
        }}
        autoPlay
        loop
        source={require('..//animation/loading-w500-h500.json')}
      />
    );
  }

  /*   componentWillMount() {
    // this.animation.play();
  } */
}
