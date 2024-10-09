import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Thunderstorm() {
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

    // Create darker, storm clouds
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

    // Create rain
    const rainGroup = new THREE.Group();
    const rainGeometry = new THREE.BufferGeometry();
    const rainMaterial = new THREE.PointsMaterial({
      color: 0xaaaaff,
      size: 0.1,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const rainCount = 1500;
    const rainPositions = new Float32Array(rainCount * 3);

    for (let i = 0; i < rainCount * 3; i += 3) {
      rainPositions[i] = Math.random() * 10 - 5;
      rainPositions[i + 1] = Math.random() * 10 - 5;
      rainPositions[i + 2] = Math.random() * 10 - 5;
    }

    rainGeometry.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
    const rain = new THREE.Points(rainGeometry, rainMaterial);
    rainGroup.add(rain);

    cloudGroup.add(rainGroup);
    
    // Position the cloud group
    cloudGroup.position.y = 1;
    
    scene.add(cloudGroup);

    // Create multiple lightning bolts
    const lightningBolts = [];
    for (let i = 0; i < 3; i++) {
      const lightningMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const lightningGeometry = new THREE.BoxGeometry(0.1, 5, 0.1);
      const lightning = new THREE.Mesh(lightningGeometry, lightningMaterial);
      lightning.visible = false;
      lightningBolts.push(lightning);
      scene.add(lightning);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Add point light for lightning effect
    const lightningLight = new THREE.PointLight(0xffff00, 0, 100);
    lightningLight.position.set(0, 2, 2);
    scene.add(lightningLight);

    let lightningTimer = 0;
    let lightningInterval = Math.random() * 3000 + 2000; // Random interval between 2-5 seconds


    
    const animate = () => {
      requestAnimationFrame(animate);

      // Gently rotate cloud
      cloudGroup.rotation.y += 0.001;

      // Animate rain
      const positions = rain.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.1;
        if (positions[i] < -5) {
          positions[i] = 5;
        }
      }
      rain.geometry.attributes.position.needsUpdate = true;

      // Lightning effect
      lightningTimer += 16; // Assuming 60fps
      if (lightningTimer > lightningInterval) {
        lightningBolts.forEach(lightning => {
          lightning.position.set(Math.random() * 5 - 2.5, Math.random() * 2 - 1, 0);
          lightning.visible = Math.random() > 0.5;  // Randomly show some of the lightning bolts
        });
        lightningLight.intensity = 1;

        setTimeout(() => {
          lightningBolts.forEach(lightning => (lightning.visible = false));
          lightningLight.intensity = 0;
        }, Math.random() * 300 + 100); // Randomize lightning duration

        lightningTimer = 0;
        lightningInterval = Math.random() * 3000 + 2000;
      }

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
