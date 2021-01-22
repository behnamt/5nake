
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { TweenMax } from 'gsap';
import React, { useEffect, useState } from "react";
import {
  AmbientLight,
  Box3,
  BoxGeometry, Fog,
  GridHelper,
  Mesh,
  MeshNormalMaterial, PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,
  Vector3,
} from "three";
import { Box } from "../components/atoms/Box";
import { useGLVeiw } from "../context/GLVeiw";

const Game = () => {

  const {setGl, gl} = useGLVeiw();

  const [box] = useState<Box>(new Box());
  const [camera] = useState<PerspectiveCamera>(new PerspectiveCamera(100, 0.4, 0.01, 1000));

  useEffect(() => {
    if (gl){
      onContextCreate(gl);
    }
  }, [gl])

  const move = (distance) => {
    TweenMax.to(box.position, 0.2, {
      z: box.position.z + distance,
    });

    TweenMax.to(camera.position, 0.2, {
      z: camera.position.z + distance,
    });
  }

  const onContextCreate = async (gl) => {

    let cameraInitialPositionX = 0;
    let cameraInitialPositionY = 2;
    let cameraInitialPositionZ = 10;

    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Renderer declaration and set properties
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor("#fff");

    // Scene declaration, add a fog, and a grid helper to see axes dimensions
    const scene = new Scene();
    scene.fog = new Fog("#3A96C4", 1, 10000);
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

    let cube = new Mesh(
      new BoxGeometry(0.5, 0.5, 0.5),
      new MeshNormalMaterial({}));

    cube.geometry.computeBoundingBox();
    let cubeBBox = new Box3(new Vector3(), new Vector3());


    let boxBBox = new Box3(new Vector3(), new Vector3());
    // console.log(box.geometry)

    scene.add(cube);
    // Set camera position and look to sphere
    camera.position.set(
      cameraInitialPositionX,
      cameraInitialPositionY,
      cameraInitialPositionZ
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

      gl.endFrameEXP();
    };
    render();

  }

  return (

    <GLView
      style={{ flex: 1 }}
      onContextCreate={setGl}
    >

    </GLView>
  )
}

export default Game;