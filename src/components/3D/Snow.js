import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Snow() {
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

    // Create snow particles
    const snowGroup = new THREE.Group();
    const snowGeometry = new THREE.BufferGeometry();
    const snowMaterial = new THREE.PointsMaterial({
      color: 0xffffff,  // White snowflakes
      size: 0.2,        // Larger than rain for more visibility
      transparent: true,
      opacity: 0.8,     
    });

    const snowCount = 1000;
    const snowPositions = new Float32Array(snowCount * 3);

    for (let i = 0; i < snowCount * 3; i += 3) {
      snowPositions[i] = Math.random() * 6 - 3;
      snowPositions[i + 1] = Math.random() * 6 - 1;
      snowPositions[i + 2] = Math.random() * 6 - 3;
    }

    snowGeometry.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
    const snow = new THREE.Points(snowGeometry, snowMaterial);
    snowGroup.add(snow);

    // Position the entire snow group more toward the bottom
    snowGroup.position.y = -4;

    cloudGroup.add(snowGroup);
    
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

      // Animate snow
      const positions = snow.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] -= 0.02; // Slower fall for snow
        positions[i - 1] += Math.sin(positions[i]) * 0.002; // Add gentle horizontal drift
        if (positions[i] < -3) {
          positions[i] = 3;
        }
      }
      snow.geometry.attributes.position.needsUpdate = true;

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
