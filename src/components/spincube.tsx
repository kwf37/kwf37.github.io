import React, { useEffect } from 'react';
import * as THREE from 'three';
import Scene from 'three';

type SpinCubeProps = {
  canvas_id: string;
};

function three(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const scene = new THREE.Scene();

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const render = (time: number) => {
    time *= 0.001; // convert time to seconds - higher number = faster spinning

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
}

const SpinCube: React.FC<SpinCubeProps> = props => {
  const [ref, _] = React.useState(React.createRef<HTMLCanvasElement>());

  useEffect(() => {
    if (ref.current != null) {
      three(ref.current);
    }
  });
  return (
    <canvas
      id={props.canvas_id}
      ref={ref}
      style={{
        position: `absolute`,
        zIndex: 1,
      }}
    ></canvas>
  );
};

export default SpinCube;
