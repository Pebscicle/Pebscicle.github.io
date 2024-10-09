import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Rain() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const parent = mountRef.current.parentElement;

    const camera = new THREE.PerspectiveCamera(75, parent.clientWidth / parent.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    renderer.setClearColor(0x000000, 0);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const cloudGroup = new THREE.Group();

    // Create fluffier cloud
    const cloudGeometry = new THREE.SphereGeometry(1, 32, 32);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 1,
      metalness: 0,
    });

    const cloudPositions = [
      { x: 0, y: 0, z: 0, scale: 1 },
      { x: -1.2, y: 0.3, z: 0, scale: 0.8 },
      { x: 1.2, y: 0.2, z: 0, scale: 0.9 },
      { x: 0, y: 0.5, z: 0.5, scale: 0.7 },
      { x: 0, y: 0.5, z: -0.5, scale: 0.7 },
      { x: -0.6, y: -0.2, z: 0.4, scale: 0.75 },
      { x: 0.6, y: -0.3, z: -0.4, scale: 0.8 },
    ];

    cloudPositions.forEach((pos) => {
      const cloudPart = new THREE.Mesh(cloudGeometry, cloudMaterial);
      cloudPart.position.set(pos.x, pos.y, pos.z);
      cloudPart.scale.setScalar(pos.scale);
      cloudGroup.add(cloudPart);
    });

    // Create thicker, more visible rain
    const rainGroup = new THREE.Group();
    const rainGeometry = new THREE.BufferGeometry();
    const rainMaterial = new THREE.PointsMaterial({
      color: 0x8888ff,  // Slightly more saturated blue
      size: 0.1,        // Increased from 0.05 to 0.1
      transparent: true,
      opacity: 0.8,     // Increased from 0.6 to 0.8
      blending: THREE.AdditiveBlending,  // This will make overlapping raindrops appear brighter
    });

    const rainCount = 1000;  // Increased from 500 to 1000 for more rain
    const rainPositions = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount * 3; i += 3) {
      rainPositions[i] = Math.random() * 6 - 3;
      rainPositions[i + 1] = Math.random() * 6 - 1;
      rainPositions[i + 2] = Math.random() * 6 - 3;
    }

    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rain = new THREE.Points(rainGeometry, rainMaterial);
    rainGroup.add(rain);

    // Position the entire rain group more toward the bottom
    rainGroup.position.y = -4;

    cloudGroup.add(rainGroup);
    
    // Position the entire cloud group toward the top
    cloudGroup.position.y = 1.5;
    
    scene.add(cloudGroup);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);

      // Gently rotate cloud
      cloudGroup.rotation.y += 0.002;

      // Animate rain
      const positions = rain.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.07; // Slightly faster rain for better visibility
        if (positions[i] < -3) {
          positions[i] = 3;
        }
      }
      rain.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const { clientWidth, clientHeight } = parent;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>;
}