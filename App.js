/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';

import { ViroARSceneNavigator } from 'react-viro';
import InventoryBar from './js/InventoryBar';
/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: 'API_KEY_HERE',
};

// Sets the default scene you want for AR and VR
var InitialARScene = require('./js/HelloWorldSceneAR');

var UNSET = 'UNSET';
var AR_NAVIGATOR_TYPE = 'AR';

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      modelItem: null,
      selectedItem: null,
      promptOpen: false,
      problemText: 'Find a banana image in the room!',
    };
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(
      this
    );
    this._exitViro = this._exitViro.bind(this);
    this._collectObject = this._collectObject.bind(this);
    this._selectInventory = this._selectInventory.bind(this);
    this._togglePrompt = this._togglePrompt.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator();
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.viroContainer}>
        <View style={localStyles.inner}>
          <ImageBackground
            source={{
              uri:
                'https://cutewallpaper.org/21/the-doors-wallpaper-iphone/1080x1920-Wallpaper-room,-lamp,-door,-three,-schedule-Room-.jpg',
            }}
            style={localStyles.image}
          >
            <TouchableHighlight
              style={localStyles.buttons}
              onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE)}
              underlayColor={'#68a0ff'}
            >
              <Text style={localStyles.buttonText}>START GAME</Text>
            </TouchableHighlight>
          </ImageBackground>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator() {
    console.log('STATE in App.js', this);
    return (
      <View style={localStyles.viroContainer}>
        <ViroARSceneNavigator
          {...this.state.sharedProps}
          initialScene={{
            scene: InitialARScene,
            passProps: {
              _collectObject: this._collectObject,
              _togglePrompt: this._togglePrompt,
            },
          }}
          viroAppProps={this.state}
        />
        <InventoryBar
          state={this.state}
          _selectInventory={this._selectInventory}
        />
      </View>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
      });
    };
  }

  _collectObject(target) {
    this.setState({ modelItem: { name: target } });
  }

  _selectInventory(target) {
    this.setState({
      selectedItem: target,
      modelItem: null,
      problemText: 'Congrats! You found it!',
    });
  }

  _togglePrompt() {
    console.log('toggle Prompt called');
    this.setState({ promptOpen: !this.state.promptOpen });
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET,
    });
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  inner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
  buttons: {
    height: 70,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 80,
    backgroundColor: '#035713',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  image: {
    flex: 1,
    // backgroundPosition: 10,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
});

module.exports = ViroSample;
