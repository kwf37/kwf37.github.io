import React, { useEffect } from 'react';
import * as THREE from 'three';
import Scene from 'three';
import Stats from 'three/examples/jsm/libs/stats.module'; //'./jsm/libs/stats.module.js';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare.js';

type BackgroundProps = {};

function three(canvas: HTMLCanvasElement) {
  var scene: THREE.Scene;
  var camera: THREE.PerspectiveCamera;
  var renderer: THREE.WebGLRenderer;
  var clock = new THREE.Clock();
  init();
  animate();
  function init() {
    // camera
    camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      15000
    );
    camera.position.z = 250;
    // scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL(0.51, 0.4, 0.01);
    scene.fog = new THREE.Fog(scene.background.getHex(), 3500, 15000);
    // world
    var s = 250;
    var geometry = new THREE.BoxBufferGeometry(s, s, s);
    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0xffffff,
      shininess: 50,
    });
    for (var i = 0; i < 1000; i++) {
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = 4000 * (2.0 * Math.random() - 1.0);
      mesh.position.y = 4000 * (2.0 * Math.random() - 1.0);
      mesh.position.z = 4000 * (2.0 * Math.random() - 1.0);
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      mesh.matrixAutoUpdate = false;
      mesh.updateMatrix();
      scene.add(mesh);
    }
    // lights
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.05);
    dirLight.position.set(0, -1, 0).normalize();
    dirLight.color.setHSL(0.1, 0.7, 0.5);
    scene.add(dirLight);
    // lensflares
    var textureLoader = new THREE.TextureLoader();
    var textureFlare0 = textureLoader.load('textures/lensflare/lensflare0.png');
    var textureFlare3 = textureLoader.load('textures/lensflare/lensflare3.png');
    addLight(0.55, 0.9, 0.5, 2000, 0, -1000);
    addLight(0.08, 0.8, 0.5, 0, 0, 1000);
    addLight(0.995, 0.5, 0.9, 2000, 2000, 1000);
    function addLight(
      h: number,
      s: number,
      l: number,
      x: number,
      y: number,
      z: number
    ) {
      var light = new THREE.PointLight(0xffffff, 1.5, 2000);
      light.color.setHSL(h, s, l);
      light.position.set(x, y, z);
      scene.add(light);
      var lensflare = new Lensflare();
      lensflare.addElement(
        new LensflareElement(textureFlare0, 700, 0, light.color)
      );
      lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
      lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
      lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
      lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
      light.add(lensflare);
    }
    // renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    // events
    window.addEventListener('resize', onWindowResize, false);
  }
  //
  function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
  //
  function animate() {
    requestAnimationFrame(animate);
    camera.rotation.z += 0.001;
    camera.rotation.x += 0.001;
    render();
  }
  function render() {
    var delta = clock.getDelta();
    renderer.render(scene, camera);
  }
}

const Background: React.FC<BackgroundProps> = props => {
  const [ref, _] = React.useState(React.createRef<HTMLCanvasElement>());

  useEffect(() => {
    if (ref.current != null) {
      three(ref.current);
    }
  });
  return (
    <canvas
      ref={ref}
      style={{
        width: '100%',
        height: '100%',
      }}
    ></canvas>
  );
};

export default Background;
