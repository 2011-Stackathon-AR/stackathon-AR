import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ViroARScene, ViroText, ViroMaterials, ViroNode } from 'react-viro';
import FireworkEmitter from './Fireworks';
export default class YouWin extends Component {
  render() {
    return (
      <ViroNode position={this.props.position}>
        <ViroText
          fontSize={18}
          style={styles2.boldFont}
          position={[0, 1, -2]}
          width={20}
          height={5}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          text="YOU WON!!!!!"
          visible={this.props.display}
        />
        <FireworkEmitter
          loop={true}
          run={true}
          explosionLocation={[0, 2, -6]}
          explosionSize={4.0}
          explosionDelay={400}
          startColor={'#ff2d2d'}
          endColor={'#42ff42'}
        />
        <FireworkEmitter
          loop={true}
          run={true}
          explosionLocation={[3, 0, -6.6]}
          explosionSize={4.0}
          explosionDelay={650}
          startColor={'#ff2d2d'}
          endColor={'#42ff42'}
        />
        <FireworkEmitter
          loop={true}
          run={true}
          explosionLocation={[-3, 0, -6.6]}
          explosionSize={3.2}
          explosionDelay={1100}
          startColor={'#ff2d2d'}
          endColor={'#42ff42'}
        />
        <FireworkEmitter
          loop={true}
          run={true}
          explosionLocation={[-4.5, 3, -5.5]}
          explosionSize={5.0}
          explosionDelay={1300}
          startColor={'#ff2d2d'}
          endColor={'#42ff42'}
        />
        <FireworkEmitter
          loop={true}
          run={true}
          explosionLocation={[-4, -0.5, -8]}
          explosionSize={7.0}
          explosionDelay={700}
          startColor={'#ff2d2d'}
          endColor={'#42ff42'}
        />
      </ViroNode>
    );
  }
}
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
let styles2 = StyleSheet.create({
  boldFont: {
    color: '#FFFFFF',
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
ViroMaterials.createMaterials({
  frontMaterial: {
    diffuseColor: '#FFFFFF',
  },
  backMaterial: {
    diffuseColor: '#FF0000',
  },
  sideMaterial: {
    diffuseColor: '#0000FF',
  },
});
module.exports = YouWin;
