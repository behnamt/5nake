import { PanGestureHandlerEventExtra } from 'react-native-gesture-handler';

const getAngleDeg = ({
  translationX: dx,
  translationY: dy,
}: PanGestureHandlerEventExtra): number => {
  if (dx === 0) {
    return dy > 0 ? 90 : -90;
  }
  const angleRad = Math.atan(dy / dx);
  const angleDeg = (angleRad * 180) / Math.PI;

  return angleDeg;
};

// eslint-disable-next-line
export { getAngleDeg };
