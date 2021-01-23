import React from 'react';
import { GestureProvider } from './src/context/Gesture';
import Root from './src/components/Root';
import { GlProvider } from './src/context/GLVeiw';
import { CameraProvider } from './src/context/Camera';

const App = () => {
  return (
    <GestureProvider>
      <GlProvider>
        <CameraProvider>
          <Root />
        </CameraProvider>
      </GlProvider>
    </GestureProvider>
  );
};

export default App;
