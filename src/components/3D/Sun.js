import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Sun() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create the scene
    const scene = new THREE.Scene();

    // Get the parent container's size for responsive rendering
    const parent = mountRef.current.parentElement;

    // Create the camera
    const camera = new THREE.PerspectiveCamera(75, parent.clientWidth / parent.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create the renderer with alpha enabled for transparency
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(parent.clientWidth, parent.clientHeight);
    renderer.setClearColor(0x000000, 0); // Set clear color to fully transparent

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // Create a group to hold the sun, glow, and rays
    const sunGroup = new THREE.Group();

    // Add the sun geometry
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(geometry, material);
    sunGroup.add(sun);

    // Glow material using custom shader
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(1.05 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 6.0);
          gl_FragColor = vec4(1.0, 0.9, 0.0, 1.0) * intensity;
        }
      `,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    const glow = new THREE.Mesh(geometry, glowMaterial);
    glow.scale.set(1.2, 1.2, 1.2); // Make the glow slightly larger than the sun
    sunGroup.add(glow);

    // Add sun rays using spherical coordinates to distribute rays around the globe
    const rayMaterial = new THREE.LineBasicMaterial({ color: 0xffd700 });
    const rayGeometry = new THREE.BufferGeometry();
    const rayVertices = [];
    const numRays = 1024; // Increase number of rays for better distribution
    const rayLength = 2; // Length of each ray

    // Create rays distributed around the sun
    for (let i = 0; i < numRays; i++) {
      // Spherical coordinates (random distribution)
      const theta = Math.random() * Math.PI * 2; // Angle around the z-axis
      const phi = Math.acos(2 * Math.random() - 1); // Angle from the z-axis

      // Convert spherical to Cartesian coordinates
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      // Starting point (just outside the sun)
      rayVertices.push(x * 1.2, y * 1.2, z * 1.2);

      // End point (extending outward)
      rayVertices.push(x * rayLength, y * rayLength, z * rayLength);
    }

    rayGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rayVertices, 3));
    const rays = new THREE.LineSegments(rayGeometry, rayMaterial);
    sunGroup.add(rays); // Add rays to the sun group

    // Add the sun group to the scene
    scene.add(sunGroup);

    // Add ambient light
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Animation loop with multi-axis rotation for the whole group (sun, glow, and rays)
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the entire group (sun, glow, and rays) on both X and Y axes
      sunGroup.rotation.y += 0.01;  // Rotate on Y axis
      sunGroup.rotation.x += 0.005; // Rotate on X axis

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resizing
    const handleResize = () => {
      const { clientWidth, clientHeight } = parent;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose(); // Clean up the renderer
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>;
}
