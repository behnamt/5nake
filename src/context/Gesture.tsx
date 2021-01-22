import React, {
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react';
import { View } from 'react-native';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { getAngleDeg } from '../utils/Math';

enum Swipe {
  Left = 'left',
  Up = 'up',
  Right = 'right',
  Down = 'down',
}

const MIN_VELOCITY = 10;

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

  const consumeSwipe = (): void => {
    setCurrentSwipe(null);
  };

  const onGestureEvent = ({ nativeEvent }: PanGestureHandlerGestureEvent) => {
    if (
      Math.abs(nativeEvent.velocityX) < MIN_VELOCITY ||
      Math.abs(nativeEvent.velocityY) < MIN_VELOCITY ||
      nativeEvent.numberOfPointers > 1 ||
      (nativeEvent.translationX === 0 && nativeEvent.translationY === 0)
    ) {
      return;
    }

    const gestureAngel = getAngleDeg(nativeEvent);
    if (Math.abs(gestureAngel) > 35 && Math.abs(gestureAngel) < 55) {
      return;
    }
    if (
      nativeEvent.translationX <= 0 &&
      gestureAngel < 35 &&
      gestureAngel > -35
    ) {
      setCurrentSwipe(Swipe.Left);
    } else if (
      nativeEvent.translationY <= 0 &&
      (gestureAngel > 55 || gestureAngel < -55)
    ) {
      setCurrentSwipe(Swipe.Up);
    } else if (
      nativeEvent.translationY >= 0 &&
      (gestureAngel > 55 || gestureAngel < -55)
    ) {
      setCurrentSwipe(Swipe.Down);
    } else if (
      nativeEvent.translationX >= 0 &&
      gestureAngel < 35 &&
      gestureAngel > -35
    ) {
      setCurrentSwipe(Swipe.Right);
    }
  };

  return {
    currentSwipe,
    consumeSwipe,
    onGestureEvent,
  };
};

const GestureProvider = ({
  children,
}: PropsWithChildren<any>): React.ReactElement => {
  const gesture = useGestureProvider();

  return (
    <gestureContext.Provider value={gesture}>
      {children}
    </gestureContext.Provider>
  );
};

export { GestureProvider, useGesture };
