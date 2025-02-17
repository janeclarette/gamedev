    import React, { useEffect, useRef } from 'react';
    import * as THREE from 'three';

    const PathVisualization = ({ start, destination }) => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Create a line to represent the path
        const points = [
        new THREE.Vector3(start.x, start.y, start.z),
        new THREE.Vector3(destination.x, destination.y, destination.z),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red line
        const line = new THREE.Line(geometry, material);
        scene.add(line);

        // Add markers (spheres) at start and destination
        const markerGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const startMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green marker
        const destinationMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Blue marker

        const startMarker = new THREE.Mesh(markerGeometry, startMarkerMaterial);
        startMarker.position.set(start.x, start.y, start.z);
        scene.add(startMarker);

        const destinationMarker = new THREE.Mesh(markerGeometry, destinationMarkerMaterial);
        destinationMarker.position.set(destination.x, destination.y, destination.z);
        scene.add(destinationMarker);

        // Calculate direction vector
        const direction = new THREE.Vector3().subVectors(
        new THREE.Vector3(destination.x, destination.y, destination.z),
        new THREE.Vector3(start.x, start.y, start.z)
        ).normalize();

        // Create an arrow helper
        const arrowHelper = new THREE.ArrowHelper(direction, new THREE.Vector3(start.x, start.y, start.z), 1000, 0xffff00); // Yellow arrow
        scene.add(arrowHelper);

        // Add a grid helper
        const gridHelper = new THREE.GridHelper(100, 100);
        scene.add(gridHelper);

        // Add an axes helper
        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        // Position the camera
        camera.position.set(0, 10, 20); // Adjust camera position to view the path
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Animation loop
        const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
        mountRef.current.removeChild(renderer.domElement);
        };
    }, [start, destination]);

    return <div ref={mountRef}></div>;
    };

    export default PathVisualization;