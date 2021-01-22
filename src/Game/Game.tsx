import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { TweenMax } from 'gsap';
import React, { useEffect, useState } from 'react';
import {
  Box3,
  BoxGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshNormalMaterial,
  PointLight,
  Scene,
  Vector3,
} from 'three';
import Box from './atoms/Box';
import { useGLVeiw } from '../context/GLVeiw';
import useCameraHook from './hooks/Camera';
import Grid from './molecules/Grid';

const Game = () => {
  const { gl, createScene, scene, renderer } = useGLVeiw();

  const [box] = useState<Box>(new Box());
  const { camera } = useCameraHook();

  const move = distance => {
    TweenMax.to(box.position, 0.2, {
      z: box.position.z + distance,
    });

    TweenMax.to(camera.position, 0.2, {
      z: camera.position.z + distance,
    });
  };

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
