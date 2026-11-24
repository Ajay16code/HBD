import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getPhotoUrl } from '../services/photoStorage';

interface CinematicCanvas3DProps {
  scrollProgress: number;
  onSelectPhoto?: (photoKey: string, title: string, subtitle: string) => void;
}

export const CinematicCanvas3D: React.FC<CinematicCanvas3DProps> = ({
  scrollProgress,
  onSelectPhoto,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<number>(0);
  const scrollCurrentRef = useRef<number>(0);

  useEffect(() => {
    scrollTargetRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: window.innerWidth >= 768,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL initialization failed, falling back gracefully.', e);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050509, 0.038);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // Blue, purple, and red cinematic lighting
    const ambientLight = new THREE.AmbientLight(0xe7e4ff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0x2563eb, 2.5, 30);
    keyLight.position.set(2, 4, 8);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xef244c, 1.8, 25);
    rimLight.position.set(-3, -2, 5);
    scene.add(rimLight);

    const goldSoftLight = new THREE.PointLight(0x7c3aed, 2.2, 40);
    goldSoftLight.position.set(0, 1, -5);
    scene.add(goldSoftLight);

    // Floating Blue-Purple-Red Dust Particles
    const particleCount = window.innerWidth < 640 ? 120 : 300;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;

      particleVelocities[i * 3] = (Math.random() - 0.5) * 0.005;
      particleVelocities[i * 3 + 1] = Math.random() * 0.006 + 0.002;
      particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle sprite
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(235, 232, 255, 1)');
      gradient.addColorStop(0.35, 'rgba(124, 58, 237, 0.6)');
      gradient.addColorStop(0.68, 'rgba(37, 99, 235, 0.35)');
      gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Floating 3D Photo Frames at different depths
    const textureLoader = new THREE.TextureLoader();
    const photoMeshes: THREE.Mesh[] = [];

    const photosMeta = [
      { key: 'hero', title: 'Ammuka Ka', subtitle: 'The emotional center', x: 0, y: 0.2, z: 2, scale: 1.6 },
      { key: 'childhood', title: 'Childhood Days', subtitle: 'So many small moments', x: -2.8, y: 0.8, z: -3, scale: 1.3 },
      { key: 'memory1', title: 'Adventures', subtitle: 'Random plans, endless talks', x: 2.7, y: -0.6, z: -7, scale: 1.3 },
      { key: 'memory2', title: 'Growing Up', subtitle: 'Time went too fast', x: -2.2, y: -0.9, z: -12, scale: 1.3 },
      { key: 'memory3', title: 'Belief & Care', subtitle: 'You always believed in me', x: 2.4, y: 1.1, z: -17, scale: 1.3 },
      { key: 'funny1', title: 'Our Bloopers', subtitle: 'Okay... this one 😂', x: -1.9, y: 0.4, z: -22, scale: 1.3 },
      { key: 'final', title: 'Happy Birthday', subtitle: 'For my Ammuka Ka ❤️', x: 0, y: 0, z: -28, scale: 1.8 },
    ];

    photosMeta.forEach((meta) => {
      const imgUrl = getPhotoUrl(meta.key);
      const texture = textureLoader.load(
        imgUrl,
        () => renderer.render(scene, camera),
        undefined,
        (err) => console.log('Texture fallback handling', err)
      );

      // Blue-purple-red frame border mesh
      const frameGeometry = new THREE.BoxGeometry(meta.scale * 1.5 + 0.12, meta.scale * 1.9 + 0.12, 0.08);
      const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x17112b,
        metalness: 0.8,
        roughness: 0.35,
        emissive: 0x2563eb,
        emissiveIntensity: 0.16,
      });
      const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);

      // Photo plane
      const photoGeometry = new THREE.PlaneGeometry(meta.scale * 1.5, meta.scale * 1.9);
      const photoMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.4,
        metalness: 0.1,
      });
      const photoMesh = new THREE.Mesh(photoGeometry, photoMaterial);
      photoMesh.position.z = 0.045;

      const group = new THREE.Group();
      group.add(frameMesh);
      group.add(photoMesh);

      group.position.set(meta.x, meta.y, meta.z);
      group.userData = { meta };

      scene.add(group);
      photoMeshes.push(photoMesh);
    });

    // Raycaster for interactive tap/click on photo
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClickOrTap = (event: MouseEvent | TouchEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in event && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else if ('clientX' in event) {
        clientX = (event as MouseEvent).clientX;
        clientY = (event as MouseEvent).clientY;
      }

      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(photoMeshes, false);

      if (intersects.length > 0 && onSelectPhoto) {
        const clicked = intersects[0].object;
        const parent = clicked.parent;
        if (parent && parent.userData && parent.userData.meta) {
          const m = parent.userData.meta;
          onSelectPhoto(m.key, m.title, m.subtitle);
        }
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('click', handleClickOrTap);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth, slow camera interpolation along the memory tunnel
      scrollCurrentRef.current += (scrollTargetRef.current - scrollCurrentRef.current) * 0.038;
      const targetZ = 8 - scrollCurrentRef.current * 36;
      camera.position.z = targetZ;
      camera.position.y = Math.sin(elapsedTime * 0.4) * 0.15;
      camera.position.x = Math.sin(scrollCurrentRef.current * Math.PI * 2) * 0.6;
      camera.rotation.z = Math.sin(elapsedTime * 0.3) * 0.015;

      // Animate floating dust particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += particleVelocities[i * 3 + 1];
        positions[i * 3] += Math.sin(elapsedTime + i) * 0.003;

        // Reset if drifted too high
        if (positions[i * 3 + 1] > 12) {
          positions[i * 3 + 1] = -12;
        }
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Subtle breathing rotation on photo groups
      scene.children.forEach((child) => {
        if (child instanceof THREE.Group && child.userData.meta) {
          child.rotation.y = Math.sin(elapsedTime * 0.5 + child.position.z) * 0.05;
          child.rotation.x = Math.cos(elapsedTime * 0.4 + child.position.x) * 0.03;
        }
      });

      // Move key lights with camera
      keyLight.position.z = camera.position.z - 2;
      goldSoftLight.position.z = camera.position.z - 8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('click', handleClickOrTap);
      renderer.dispose();
      if (domElement.parentNode) {
        domElement.parentNode.removeChild(domElement);
      }
    };
  }, [onSelectPhoto]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-auto z-0 overflow-hidden select-none"
      style={{ touchAction: 'pan-y' }}
      aria-hidden="true"
    />
  );
};
