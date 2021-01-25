'use strict';

import React, { Component } from 'react';

import {
  DrawerLayoutAndroidBase,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

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
  ViroFlexView,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor(props) {
    super(props);

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      animName: '',
      playAnim: false,
      textAnim: false,
      renderdiv: false,
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    console.log('Props passed to ARscene', this.props);
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroARImageMarker
          target={'smile1'}
          onAnchorFound={this._onAnchorFound}
        >
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
            animation={{
              name: this.state.animName,
              run: this.state.playAnim,
            }}
            onClick={this._onClick}
          />
          {/* </ViroNode> */}
        </ViroARImageMarker>
        <ViroText
          fontSize={24}
          style={styles.boldFont}
          textLineBreakMode="WordWrap"
          position={[0, 0, -2]}
          width={1}
          height={5}
          extrusionDepth={8}
          materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
          text="Go to the star"
        />
        <Viro3DObject
          source={require('./res/object_star_anim/object_star_anim.vrx')}
          type="VRX"
          materials="star"
          position={[2, 0.5, -1]}
          highAccuracyEvents={true}
          rotation={[0, -60, 0]}
          scale={[0.25, 0.25, 0.25]}
          onClick={this.props._togglePrompt}
          animation={{ name: 'rotate', run: true, loop: true }}
          // onClick={() => {
          //   this.props.addCoinToBoard(this.props.id);
          // }}
          // visible={this.props.visible}
        />
        {this.props.sceneNavigator.viroAppProps.promptOpen && (
          <ViroFlexView
            style={styles.problem}
            position={[4, 0.3, -2.2]}
            rotation={[0, -60, 0]}
            width={1.5}
            height={1}
          >
            <ViroText
              fontSize={15}
              style={styles.problemText}
              textLineBreakMode="WordWrap"
              // position={[2, 0.3, -2.2]}

              // extrusionDepth={8}
              // materials={['frontMaterial', 'backMaterial', 'sideMaterial']}
              text={this.props.sceneNavigator.viroAppProps.problemText}
            />
          </ViroFlexView>
        )}

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
        text: 'This is TEXT',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  _onAnchorFound() {
    console.log('anchorFound');
    this.setState({
      playAnim: true,
      animName: 'scaleCar',
      renderdiv: true,
    });
  }

  _onClick() {
    this.props._collectObject('smile');
    this.setState({
      textAnim: true,
      renderdiv: true,
      animName: 'scaleDownCar',
    });
  }
}

ViroARTrackingTargets.createTargets({
  smile1: {
    source: require('./res/banana_target.jpg'),
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
  },
  prompt: {
    source: require('./res/logo.png'),
    orientation: 'Up',
    physicalWidth: 0.1, // real world width in meters
  },
});
var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 8,
    color: '#000000',
    textAlignVertical: 'center',
    textAlign: 'center',
    flex: 0.5,
  },
  problem: {
    backgroundColor: 'white',
  },
  problemText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
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
  star: {
    shininess: 2.0,
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/object_star_anim/object_star_diffuse.png'),
    specularTexture: require('./res/object_star_anim/object_star_specular.png'),
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
      // rotateX: '+=90',
      // rotateZ: '+=90',
    },
    duration: 250, //.25 seconds
  },
  scaleCar: {
    properties: { scaleX: 0.09, scaleY: 0.09, scaleZ: 0.09 },
    duration: 500,
    easing: 'bounce',
  },
  scaleDownCar: {
    properties: { scaleX: 0, scaleY: 0, scaleZ: 0 },
    duration: 500,
    easing: 'bounce',
  },
});

module.exports = HelloWorldSceneAR;
