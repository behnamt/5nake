import { GLView } from 'expo-gl';
import { Renderer } from 'expo-three';
import { TweenMax } from 'gsap';
import React, { useEffect, useState } from 'react';
import {
  AmbientLight,
  Box3,
  BoxGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Vector3,
} from 'three';
import Box from './atoms/Box';
import { useGLVeiw } from '../context/GLVeiw';
import useCameraHook from './hooks/Camera';

const Game = () => {
  const { setGl, gl } = useGLVeiw();

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

  const onContextCreate = async _gl => {
    const cameraInitialPositionX = 0;
    const cameraInitialPositionY = 2;
    const cameraInitialPositionZ = 10;

    const { drawingBufferWidth: width, drawingBufferHeight: height } = _gl;

    // Renderer declaration and set properties
    const renderer = new Renderer({ gl: _gl });
    renderer.setSize(width, height);
    renderer.setClearColor('#fff');

    // Scene declaration, add a fog, and a grid helper to see axes dimensions
    const scene = new Scene();
    scene.fog = new Fog('#3A96C4', 1, 10000);
    scene.add(new GridHelper(10, 10));

    // Add all necessary lights
    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    // Add sphere object instance to our scene
    scene.add(box);

    const cube = new Mesh(
      new BoxGeometry(0.5, 0.5, 0.5),
      new MeshNormalMaterial({}),
    );

    cube.geometry.computeBoundingBox();
    const cubeBBox = new Box3(new Vector3(), new Vector3());

    const boxBBox = new Box3(new Vector3(), new Vector3());
    // console.log(box.geometry)

    scene.add(cube);
    // Set camera position and look to sphere
    camera.position.set(
      cameraInitialPositionX,
      cameraInitialPositionY,
      cameraInitialPositionZ,
    );

    camera.lookAt(box.position);

    // Render function
    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);

      cubeBBox.setFromObject(cube);
      boxBBox.setFromObject(box);

      // if (cubeBBox.intersectsBox(boxBBox)) {
      //   console.log('HIT');
      // } else {
      //   console.log('NOT')
      // }

      _gl.endFrameEXP();
    };
    render();
  };

  useEffect(() => {
    if (gl) {
      onContextCreate(gl);
    }
  }, [gl]);

  return <GLView style={{ flex: 1 }} onContextCreate={setGl} />;
};

export default Game;
