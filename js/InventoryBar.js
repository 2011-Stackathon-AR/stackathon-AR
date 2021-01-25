import React, { useState } from 'react';
import { StyleSheet, TouchableHighlight, Image, View } from 'react-native';

const InventoryBar = (props) => {
  console.log('PROPS in InventoryBar', props);
  const [render, setRender] = useState(0);
  console.log('render', render);

  const useForceRender = () => {
    return () => setRender((render) => render + 1);
  };

  const forceRender = useForceRender();

  const _clickItem = () => {
    props._selectInventory(props.state.modelItem.name);
  };

  if (props.state.modelItem && render < 1) {
    forceRender();
  } else if (!props.state.modelItem && render === 1) {
    forceRender();
  }

  return (
    <View style={localStyles.menu}>
      {props.state.modelItem && (
        <TouchableHighlight style={localStyles.icon} onPress={_clickItem}>
          <Image
            source={{
              uri: 'https://image.flaticon.com/icons/png/512/742/742751.png',
            }}
            style={localStyles.img}
          ></Image>
        </TouchableHighlight>
      )}
    </View>
  );
};

const localStyles = StyleSheet.create({
  img: {
    width: 55,
    height: 55,
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 50,
    width: 65,
    marginLeft: 15,
    marginTop: 10,
    borderRadius: 5,
    borderWidth: 0,
  },
  menu: {
    width: '100%',
    height: 85,
    backgroundColor: 'black',
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
  },
});

export default InventoryBar;
