import React, { useState, useContext, PropsWithChildren } from 'react';
import { PerspectiveCamera } from 'three';

interface ICameraContext {
  camera: PerspectiveCamera;
}

const cameraInitialPositionX = 0;
const cameraInitialPositionY = 2;
const cameraInitialPositionZ = 10;

const cameraContext = React.createContext<ICameraContext>({
  camera: null,
});

const useCamera = (): ICameraContext => useContext(cameraContext);

const useCameraProvider = (): ICameraContext => {
  const [camera] = useState<PerspectiveCamera>(
    new PerspectiveCamera(100, 0.4, 0.01, 1000),
  );

  camera.position.set(
    cameraInitialPositionX,
    cameraInitialPositionY,
    cameraInitialPositionZ,
  );

  return {
    camera,
  };
};

const CameraProvider = ({
  children,
}: PropsWithChildren<any>): React.ReactElement => {
  const camera = useCameraProvider();

  return (
    <cameraContext.Provider value={camera}>{children}</cameraContext.Provider>
  );
};

export { CameraProvider, useCamera };
