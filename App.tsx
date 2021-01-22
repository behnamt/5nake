
import React from "react";
import { GestureProvider } from "./src/context/Gesture";
import Root from "./src/components/Root";
import { GlProvider } from "./src/context/GLVeiw";

const App = () => {
  return (
    <GestureProvider>
      <GlProvider>
        <Root />
      </GlProvider>
    </GestureProvider>
  )
}

export default App;