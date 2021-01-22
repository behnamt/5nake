
import React from "react";
import { PanGestureHandler } from 'react-native-gesture-handler';
import Game from "../Game/Game";
import { useGesture } from "../context/Gesture";
import { View } from "react-native";

const Root = () => {
  const { onGestureEvent } = useGesture();

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
    >
      <View style={{ flex: 1 }}>
        <Game />
      </View>
     </PanGestureHandler>
  )
}

export default Root;