import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export const FlagLoader = ({ width = 4, height = 2, speed = 2, textureUrl }) => {
  const mountRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.shadowMap.enabled = true; // for better realism
    if (!mountRef.current.hasChildNodes()) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 🌤 Ambient light — soft, fills dark areas
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // ☀️ Directional light — main sunlight
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
    mainLight.position.set(3, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // ✨ Backlight — gives rim/glow effect for depth
    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(-4, 3, -3);
    scene.add(backLight);

    // 🏳️ Flag geometry
    const segmentsX = 30,
      segmentsY = 1;
    const geometry = new THREE.PlaneGeometry(width, height, segmentsX, segmentsY);

    // 🎨 Material (with specular reflection)
    const texture = new THREE.TextureLoader().load(textureUrl);
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      shininess: 60, // stronger highlight
      specular: new THREE.Color(0xeeeeee), // slight reflective tone
    });

    const flag = new THREE.Mesh(geometry, material);
    flag.rotation.x = -0.7;
    flag.rotation.y = -0.3;
    flag.rotation.z = -0.1;
    scene.add(flag);

    // 🌀 Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const time = -clock.getElapsedTime();

      const position = geometry.attributes.position;
      const vertex = new THREE.Vector3();

      for (let i = 0; i < position.count; i++) {
        vertex.fromBufferAttribute(position, i);

        const factor = (vertex.x + width / 2) / width; // left fixed
        vertex.z =
          0.3 *
          factor *
          Math.sin(vertex.x * 3 + time * 2 * speed) *
          Math.cos(vertex.y * 3 + time * speed);

        position.setZ(i, vertex.z);
      }

      position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // 🪟 Handle resize
    const handleResize = () => {
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [width, height, speed, textureUrl]);

  return <div ref={mountRef} style={{ width: "200px", height: "200px" }} />;
};

export default FlagLoader;
