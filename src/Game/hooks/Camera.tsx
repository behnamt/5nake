import { useState } from 'react';
import { PerspectiveCamera } from 'three';

interface IUsecameraHook {
  camera: PerspectiveCamera;
}

const useCameraHook = (): IUsecameraHook => {
  const [camera] = useState<PerspectiveCamera>(
    new PerspectiveCamera(100, 0.4, 0.01, 1000),
  );

  return { camera };
};

export default useCameraHook;
