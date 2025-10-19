import * as THREE from "three";
import { Reflector } from "three/examples/jsm/Addons.js";

const images = [
  "socrates.jpg",
  "stars.jpg",
  "wave.jpg",
  "spring.jpg",
  "mountain.jpg",
  "sunday.jpg",
];

const titles = [
  "The Death of Socrates",
  "Starry Night",
  "The Great Wave off Kanagawa",
  "Effect of Spring, Giverny",
  "Mount Corcoran",
  "A Sunday on La Grande Jatte",
];

const artists = [
  "Jacques-Louis David",
  "Vincent Van Gogh",
  "Katsushika Hokusai",
  "Claude Monet",
  "Albert Bierstadt",
  "George Seurat",
];

const textureLoader = new THREE.TextureLoader();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const rootNode = new THREE.Object3D();
scene.add(rootNode);

let count = 6;
for (let i = 0; i < count; i++) {
  const texture = textureLoader.load(images[i]);
  texture.colorSpace = THREE.SRGBColorSpace;
  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = i * ((2 * Math.PI) / count);
  rootNode.add(baseNode);

  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.09),
    new THREE.MeshStandardMaterial({ color: 0x202020 })
  );
  border.position.z = -4;
  baseNode.add(border);

  const artwork = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.1),
    new THREE.MeshStandardMaterial({ map: texture })
  );
  artwork.position.z = -4;
  baseNode.add(artwork);
}

const left = new THREE.Mesh(
  new THREE.BoxGeometry(0.3, 0.3, 0.1)
  //new THREE.MeshStandardMaterial({map:})
);

const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10.0, 0.65, 1);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 0.5, -5);
scene.add(spotlight);
scene.add(spotlight.target);

const mirror = new Reflector(new THREE.CircleGeometry(10), {
  color: 0x505050,
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
});
mirror.position.y = -1.1;
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

function animate() {
  rootNode.rotation.y += 0.002;
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  mirror.getRenderTarget().setSize(window.innerWidth, window.innerHeight);
});
