import { ExpoWebGLRenderingContext } from 'expo-gl';
import React, {
  useState, useContext, useEffect, PropsWithChildren,
} from 'react';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';


interface IGLVeiwContext {
  gl: ExpoWebGLRenderingContext,
  setGl(gl: ExpoWebGLRenderingContext): void;
}

const glViewContext = React.createContext<IGLVeiwContext>({
  gl: null,
  setGl: () => null,
});

const useGLVeiw = (): IGLVeiwContext => useContext(glViewContext);

const useGLViewProvider = (): IGLVeiwContext => {
  const [gl, setGl] = useState(null);


  return {
    gl,
    setGl,
  };
};

const GlProvider = ({ children }: PropsWithChildren<any>): React.ReactElement => {
  const glView = useGLViewProvider();

  return (
    <glViewContext.Provider value={glView}>
      {children}
    </glViewContext.Provider>
  );
};

export { GlProvider, useGLVeiw };
