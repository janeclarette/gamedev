// mainComponent.js
import * as THREE from 'three';
import {createSupermarketModal, createCongratulatoryModal, showBudgetingLessonModal } from './modals';



const supermarketCoordinates = new THREE.Vector3(-4.753375371950036, 0.6999999999999995, -21.946643547283124);
const proximityThreshold = 5;

const initializeSupermarketInteraction = () => {
// Add CSS styles
const style = document.createElement('style');
style.innerHTML = `
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,400italic);

  /* Global */
  body {
    font-family: 'Open Sans';
    line-height: 200%;
  }

  .main {
    width: 800px;
    margin: 160px auto;
    text-align: center;
  }

  h1, h2, h3 {
    color: #fff;
  }

  h1 {
    margin-bottom: 30px;
    font-size: 44px;
  }

  h2 {
    margin-bottom: 20px;
    font-size: 32px;
  }

  h3 {
    font-size: 21px;
  }

  p {
    font-size: 18px;
    color: #ffd5df;
  }

  .btn {
    margin-top: 30px;
    padding: 2.2% 5.5%;
    display: inline-block;
    transition: all linear 0.15s;
    border-radius: 3px;
    background: #fff;
    font-size: 22px;
    font-weight: bold;
    text-decoration: none;
    text-transform: uppercase;
    color: #333;
  }

  .btn:hover {
    opacity: 0.75;
  }

  /* Popup */
  .popup-wrap {
    width: 100%;
    height: 100%;
    display: none;
    position: absolute;
    top: 0px;
    left: 0px;
    content: '';
    background: rgba(0, 0, 0, 0.85);
  }

  .popup-box {
    width: 600px;
    padding: 20px;
    transform: translate(-50%, -50%) scaleY(0);
    transform-origin: top;
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background: #fff;
    text-align: center;
    transition: transform 0.5s ease;
  }

  .popup-box h2 {
    color: #1a1a1a;
  }

  .popup-box h3 {
    color: #888;
  }

  .popup-box .close-btn {
    width: 35px;
    height: 35px;
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 10px;
    transition: all ease 0.5s;
    border-radius: 1000px;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    line-height: 190%;
  }

  .popup-box .close-btn:hover {
    transform: rotate(180deg);
  }

  .transform-in, .transform-out {
    display: block;
    transition: all ease 0.5s;
  }

  .transform-in {
    transform: translate(-50%, -50%) scaleY(1);
  }

  .transform-out {
    transform: translate(-50%, -50%) scaleY(0);
  }

  /* E-commerce theme */
  .product-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .product-item {
    width: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background: #f9f9f9;
    text-align: center;
  }

  .product-item .icon {
    font-size: 50px;
    margin-bottom: 10px;
  }

  .product-item h4 {
    margin: 10px 0;
    font-size: 18px;
    color: #333;
  }

  .product-item p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
  }

  .product-item button {
    padding: 10px;
    font-size: 16px;
    background-color: #002F6C;
    color: #FFD700;
    border: 2px solid #FFD700;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .product-item button:hover {
    background-color: #FFD700;
    color: #002F6C;
  }

  .cart-total {
    margin-top: 20px;
    font-size: 20px;
    color: #002F6C;
  }

  .caution {
    margin-top: 20px;
    font-size: 18px;
    color: red;
    display: none;
  }
`;
document.head.appendChild(style);

  // Create the supermarket modal
  createSupermarketModal();
  createCongratulatoryModal();
  showBudgetingLessonModal();
};

const updateSupermarketInteractionButton = (characterPosition, interactionButton) => {
  const distanceToSupermarket = characterPosition.distanceTo(supermarketCoordinates);

  if (distanceToSupermarket <= proximityThreshold) {
    interactionButton.innerText = 'Go to Supermarket';
    interactionButton.style.display = 'block';
    return true;
  }
  return false;
};

const handleSupermarketInteractionClick = () => {
  const supermarketModal = document.getElementById('supermarketModal');
  supermarketModal.style.display = 'block';
  supermarketModal.classList.add('bounce-in');

  // Remove the bounce-in class after the animation ends
  supermarketModal.addEventListener('animationend', () => {
    supermarketModal.classList.remove('bounce-in');
  }, { once: true });
};

export { initializeSupermarketInteraction, updateSupermarketInteractionButton, handleSupermarketInteractionClick };