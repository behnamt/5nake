import { ExpoWebGLRenderingContext } from 'expo-gl';
import { Renderer } from 'expo-three';
import React, {
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react';
import { Fog, GridHelper, Scene } from 'three';

interface IGLVeiwContext {
  gl: ExpoWebGLRenderingContext;
  scene: Scene;
  renderer: Renderer;
  createScene(gl: ExpoWebGLRenderingContext): void;
}

const glViewContext = React.createContext<IGLVeiwContext>({
  gl: null,
  scene: null,
  renderer: null,
  createScene: () => null,
});

const useGLVeiw = (): IGLVeiwContext => useContext(glViewContext);

const useGLViewProvider = (): IGLVeiwContext => {
  const [gl, setGl] = useState<ExpoWebGLRenderingContext>(null);
  const [scene, setScene] = useState<Scene>(null);
  const [renderer, setRenderer] = useState<Renderer>(null);

  const createScene = (_gl: ExpoWebGLRenderingContext): void => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = _gl;

    // Renderer declaration and set properties
    const localRenderer = new Renderer({ gl: _gl });
    localRenderer.setSize(width, height);
    localRenderer.setClearColor('#fff');

    // Scene declaration, add a fog, and a grid helper to see axes dimensions
    const localScene = new Scene();
    localScene.fog = new Fog('#3A96C4', 1, 10000);
    localScene.add(new GridHelper(10, 10));

    setGl(_gl);
    setScene(localScene);
    setRenderer(localRenderer);
  };

  return {
    gl,
    scene,
    renderer,
    createScene,
  };
};

const GlProvider = ({
  children,
}: PropsWithChildren<any>): React.ReactElement => {
  const glView = useGLViewProvider();

  return (
    <glViewContext.Provider value={glView}>{children}</glViewContext.Provider>
  );
};

export { GlProvider, useGLVeiw };
