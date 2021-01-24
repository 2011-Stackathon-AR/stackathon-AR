'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  ViroARImageMarker,
  ViroARTrackingTargets,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      animateCar: false,
      smile: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARImageMarker
          target={'smile1'}
          onAnchorFound={this._onAnchorFound}
        >
          {/* <ViroBox position={[0, 0.25, 0]} scale={[0.5, 0.5, 0.5]} /> */}
          {/* <ViroNode
            position={[0, -1, 0]}
            dragType="FixedToWorld"
            onDrag={() => {}}
          > */}
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            resources={[
              require('./res/emoji_smile/emoji_smile_diffuse.png'),
              require('./res/emoji_smile/emoji_smile_normal.png'),
              require('./res/emoji_smile/emoji_smile_specular.png'),
            ]}
            scale={[0, 0, 0]}
            type="VRX"
            rotation={[-90, 0, 0]}
            animation={{ name: 'scaleCar', run: this.state.animateCar }}
          />
          {/* </ViroNode> */}
        </ViroARImageMarker>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />
        <ViroBox
          position={[0, -0.5, -1]}
          scale={[0.3, 0.3, 0.1]}
          materials={['grid']}
          animation={{ name: 'rotate', run: true, loop: true }}
        />
        <ViroAmbientLight color={'#aaaaaa'} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#ffffff"
          castsShadow={true}
        />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Sato and Ivan AR Project!!!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onAnchorFound() {
    this.setState({
      animateCar: true,
    });
  }
}
ViroARTrackingTargets.createTargets({
  smile1: {
    source: require('./res/logo.png'),
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
  },
});
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 10,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
  banana: {
    diffuseTexture: require('./res/banana/Banana_BaseColor.png'),
  },
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=90',
      rotateX: '+=90',
      rotateZ: '+=90',
    },
    duration: 250, //.25 seconds
  },
  scaleCar: {
    properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
    duration: 500,
    easing: 'bounce',
  },
});

ViroARTrackingTargets.createTargets({
  smile: {
    source: require('./res/smile.jpeg'),
    orientation: 'Up',
    physicalWidth: 0.15, // real world width in meters
  },
});

module.exports = HelloWorldSceneAR;
