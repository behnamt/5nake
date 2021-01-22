import React, {
  useState, useContext, useEffect, PropsWithChildren,
} from 'react';
import { View } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

enum Swipe {
  Left = 'left',
  Up = 'up',
  Right = 'right',
  Down = 'down',
}

interface IGestureContext {
  currentSwipe: Swipe | null;
  consumeSwipe(): void;
  onGestureEvent(event: PanGestureHandlerGestureEvent): void;
}

const gestureContext = React.createContext<IGestureContext>({
  currentSwipe: null,
  consumeSwipe: () => null,
  onGestureEvent: () => null,
});

const useGesture = (): IGestureContext => useContext(gestureContext);

const useGestureProvider = (): IGestureContext => {
  const [currentSwipe, setCurrentSwipe] = useState(null);

  const consumeSwipe = () => {
    console.log('consume');
  }


  const onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    // move(a.nativeEvent.translationX / 100)
    console.log(event);

  }

  return {
    currentSwipe,
    consumeSwipe,
    onGestureEvent
  };
};

const GestureProvider = ({ children }: PropsWithChildren<any>): React.ReactElement => {
  const gesture = useGestureProvider();

  return (
    <gestureContext.Provider value={gesture}>
      {children}
    </gestureContext.Provider>
  );
};

export { GestureProvider, useGesture };
