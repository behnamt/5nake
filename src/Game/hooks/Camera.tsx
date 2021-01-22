import { useState } from 'react';
import { PerspectiveCamera } from 'three';

interface IUsecameraHook {
  camera: PerspectiveCamera;
}
const cameraInitialPositionX = 0;
const cameraInitialPositionY = 2;
const cameraInitialPositionZ = 10;

const useCameraHook = (): IUsecameraHook => {
  const [camera] = useState<PerspectiveCamera>(
    new PerspectiveCamera(100, 0.4, 0.01, 1000),
  );

  camera.position.set(
    cameraInitialPositionX,
    cameraInitialPositionY,
    cameraInitialPositionZ,
  );

  return { camera };
};

export default useCameraHook;
