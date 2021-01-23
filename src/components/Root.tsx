import React from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { View } from 'react-native';
import Game from '../Game/Game';
import { useGesture } from '../context/Gesture';

const Root = () => {
  const { onGestureEvent } = useGesture();

  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <View style={{ flex: 1 }}>
        <Game />
      </View>
    </PanGestureHandler>
  );
};

export default Root;
