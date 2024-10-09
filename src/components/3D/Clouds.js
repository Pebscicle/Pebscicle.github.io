import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Clouds() {
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

    const createCloud = (x, y, z) => {
      const cloudGroup = new THREE.Group();
      const geometries = [
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.SphereGeometry(0.8, 32, 32),
        new THREE.SphereGeometry(0.7, 32, 32),
        new THREE.SphereGeometry(0.6, 32, 32),
        new THREE.SphereGeometry(0.5, 32, 32)
      ];
      
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.2, // Make the surface smoother for more light reflection
        metalness: 0,
        emissive: new THREE.Color(0xeeeeee), // Give a slight glow to the cloud
        emissiveIntensity: 0.5,
      });

      const positions = [
        { x: 0, y: 0, z: 0 },
        { x: -0.8, y: 0.2, z: 0.3 },
        { x: 0.8, y: 0.3, z: 0.2 },
        { x: -0.3, y: -0.2, z: -0.4 },
        { x: 0.3, y: -0.3, z: 0.4 }
      ];

      positions.forEach((pos, index) => {
        const cloudPart = new THREE.Mesh(geometries[index], material);
        cloudPart.position.set(pos.x, pos.y, pos.z);
        cloudGroup.add(cloudPart);
      });

      cloudGroup.position.set(x, y, z);
      return cloudGroup;
    };

    const clouds = [
      createCloud(-2, 1, 0),
      createCloud(2, 1.5, -1),
      createCloud(0, 2, -2),
      createCloud(-1.5, 0, -1),
      createCloud(1.5, -0.5, -0.5)
    ];

    clouds.forEach(cloud => scene.add(cloud));

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xcccccc, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    const animate = () => {
      requestAnimationFrame(animate);

      // Gently rotate and move clouds
      clouds.forEach((cloud, index) => {
        cloud.rotation.y += 0.002 * (index % 2 === 0 ? 1 : -1);
        cloud.position.x += Math.sin(Date.now() * 0.001 + index) * 0.002;
        cloud.position.y += Math.cos(Date.now() * 0.001 + index) * 0.001;
      });

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