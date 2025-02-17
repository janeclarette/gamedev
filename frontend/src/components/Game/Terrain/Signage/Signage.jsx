import * as THREE from 'three';

const HouseSignageBrd = (position) => {
  const boardGeometry = new THREE.BoxGeometry(2, 1, 0.1);
  const boardMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const board = new THREE.Mesh(boardGeometry, boardMaterial);

  const textCanvas = document.createElement('canvas');
  textCanvas.width = 512;
  textCanvas.height = 256;
  const context = textCanvas.getContext('2d');
  context.fillStyle = '#ffffff';
  context.font = '48px Arial';
  context.fillText('boarding house', 50, 128);

  const textTexture = new THREE.CanvasTexture(textCanvas);
  const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
  const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), textMaterial);
  textMesh.position.set(0, 0, 0.06);

  board.add(textMesh);
  board.position.set(...position);
  board.rotation.y = THREE.MathUtils.degToRad(60); // Rotate the board by 30 degrees

  return board;
};

const SMSignageBrd = (position) => {
  const boardGeometry = new THREE.BoxGeometry(2, 1, 0.1);
  const boardMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 });
  const board = new THREE.Mesh(boardGeometry, boardMaterial);

  const textCanvas = document.createElement('canvas');
  textCanvas.width = 512;
  textCanvas.height = 256;
  const context = textCanvas.getContext('2d');
  context.fillStyle = '#ffffff';
  context.font = '48px Arial';
  context.fillText('supermarket', 50, 128);

  const textTexture = new THREE.CanvasTexture(textCanvas);
  const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture });
  const textMesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 1), textMaterial);
  textMesh.position.set(0, 0, 0.06);

  board.add(textMesh);
  board.position.set(...position);


  return board;
};

export { HouseSignageBrd, SMSignageBrd};