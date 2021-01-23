import { GLView } from 'expo-gl';
import { TweenMax } from 'gsap';
import React, { useEffect, useState } from 'react';
import { PointLight } from 'three';
import Box from './atoms/Box';
import { useGLVeiw } from '../context/GLVeiw';
import Grid from './molecules/Grid';
import { useGesture } from '../context/Gesture';
import { Swipe } from '../@types/Gesture';
import { useCamera } from '../context/Camera';

const Game = () => {
  const { gl, createScene, scene, renderer } = useGLVeiw();

  const [box] = useState<Box>(new Box());
  const { camera } = useCamera();
  const { currentSwipe, consumeSwipe } = useGesture();

  const move = (direction: Swipe) => {
    const multiplyer =
      direction === Swipe.Right || direction === Swipe.Up ? -1 : 1;
    const axis =
      direction === Swipe.Left || direction === Swipe.Right ? 'x' : 'y';
    console.log(axis, camera.position[axis] + 1 * multiplyer);

    TweenMax.to(camera.position, 0.2, {
      [axis]: camera.position[axis] + 1 * multiplyer,
    });
  };

  // TODO: this is just for demo, remove!
  useEffect(() => {
    if (currentSwipe) {
      consumeSwipe();
      move(currentSwipe);
    }
  }, [currentSwipe]);

  const onContextCreate = async () => {
    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    camera.lookAt(box.position);

    // eslint-disable-next-line
    new Grid(scene);

    // Render function
    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);

      gl.endFrameEXP();
    };
    render();
  };

  useEffect(() => {
    if (scene) {
      onContextCreate();
    }
  }, [scene]);

  return <GLView style={{ flex: 1 }} onContextCreate={createScene} />;
};

export default Game;
