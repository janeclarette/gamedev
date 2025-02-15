import * as THREE from 'three';
import React, { useState } from 'react';

const npc4Position = new THREE.Vector3(-12.021399993996956, 0.2, 27.562547489891013);
const interactionDistance = 2.0;

const dialogueLines = [
  "Welcome! The rent is ₱2,500 per month, including utilities. Pay on the 5th every month. You’ll share the space with others.",
  "You have ₱5,000 given by your parents in the province. You need to budget wisely."
];

let currentLineIndex = 0;

const initializeNPC4Interaction = () => {
    const npcModal = document.createElement('div');
    npcModal.id = 'npc4Modal';
    npcModal.style.position = 'fixed';
    npcModal.style.top = '50%';
    npcModal.style.left = '50%';
    npcModal.style.transform = 'translate(-50%, -50%)';
    npcModal.style.width = '400px';
    npcModal.style.height = '200px';
    npcModal.style.backgroundColor = '#FFFFFF';
    npcModal.style.borderRadius = '10px';
    npcModal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    npcModal.style.zIndex = '1000';
    npcModal.style.display = 'none';
    npcModal.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <p id="npc4Dialogue" style="color: black;">${dialogueLines[currentLineIndex]}</p>
        <button id="nextButton4" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Next</button>
        <div id="choices4" style="margin-top: 20px; display: none;">
          <button id="choiceA" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Pay rent immediately</button>
          <button id="choiceB" style="padding: 10px 20px; background-color: #C0C0C0; color: black; border: none; border-radius: 5px; cursor: pointer;">Delay payment</button>
        </div>
      </div>
    `;
    document.body.appendChild(npcModal);

    document.getElementById('nextButton4').addEventListener('click', () => {
      currentLineIndex++;
      if (currentLineIndex < dialogueLines.length) {
        document.getElementById('npc4Dialogue').innerText = dialogueLines[currentLineIndex];
        if (currentLineIndex === dialogueLines.length - 1) {
          document.getElementById('nextButton4').style.display = 'none';
          document.getElementById('choices4').style.display = 'block';
        }
      } else {
        npcModal.style.display = 'none';
        currentLineIndex = 0;
      }
    });

    document.getElementById('choiceA').addEventListener('click', () => {
      alert('You chose to pay rent immediately. -₱2,500');
      document.getElementById('npc4Dialogue').innerText = "Alright, here’s my ₱2,500 as my first rent payment. I’ll pay as early as I can.";
      setTimeout(() => {
        npcModal.style.display = 'none';
        currentLineIndex = 0;
        toggleSystemNarrationModal(); // Show the system narration modal
      }, 3000); // Close the modal after 3 seconds
    });

    document.getElementById('choiceB').addEventListener('click', () => {
      alert('You chose to delay payment. +₱2,500 for now.');
      document.getElementById('npc4Dialogue').innerText = "I’ll hand my payment on my monthly due, I’ll make sure to pay not too late to avoid late fees.";
      setTimeout(() => {
        npcModal.style.display = 'none';
        currentLineIndex = 0;
        toggleSystemNarrationModal(); // Show the system narration modal
      }, 3000); // Close the modal after 3 seconds
    });
  };

  const toggleSystemNarrationModal = () => {
    const existingModal = document.getElementById('systemNarrationModal');
    if (existingModal) {
        if (existingModal.style.width === '150px') {
            // Restore the modal to its original size
            existingModal.style.width = '400px';
            existingModal.style.height = 'auto';
            existingModal.style.top = '50%';
            existingModal.style.left = '50%';
            existingModal.style.transform = 'translate(-50%, -50%)';
            existingModal.style.padding = '20px';
            existingModal.innerHTML = `
                <p style="color: black;">💬System: First Budgeting Side Quest</p>
                <ul style="color: black;">
                    <li>✅ Smart Grocery Shopping: Pick affordable and nutritious food choices without exceeding ₱2,000</li>
                    <li>✅ Budget Stretching Challenge: Find a way to purchase essentials while saving at least ₱500 for emergencies.</li>
                </ul>
                <p style="color: black;">🎮Complete 2 Tasks in your first Side Quest!</p>
                <p style="color: red; font-weight: bold;">Note: Supermarket is close to bank.</p>
                <button id="continueButtonNarration" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Continue</button>
            `;
            document.getElementById('continueButtonNarration').addEventListener('click', toggleSystemNarrationModal);
        } else {
            // Minimize the modal
            existingModal.style.width = '150px';
            existingModal.style.height = '40px';
            existingModal.style.top = 'auto';
            existingModal.style.left = 'auto';
            existingModal.style.bottom = '20px';
            existingModal.style.right = '20px';
            existingModal.style.transform = 'none';
            existingModal.style.padding = '5px';
            existingModal.style.display = 'block';
            existingModal.innerHTML = `
                <div style="text-align: center; cursor: pointer;">
                    <p style="color: black; font-size: 12px; margin: 0;">Side Quest</p>
                </div>
            `;
            existingModal.addEventListener('click', toggleSystemNarrationModal);
        }
    } else {
        // Create the modal
        const systemNarration = document.createElement('div');
        systemNarration.id = 'systemNarrationModal';
        systemNarration.style.position = 'fixed';
        systemNarration.style.top = '50%';
        systemNarration.style.left = '50%';
        systemNarration.style.transform = 'translate(-50%, -50%)';
        systemNarration.style.width = '400px';
        systemNarration.style.height = 'auto';
        systemNarration.style.backgroundColor = '#f9f9f9';
        systemNarration.style.borderRadius = '10px';
        systemNarration.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        systemNarration.style.zIndex = '1000';
        systemNarration.style.padding = '20px';
        systemNarration.innerHTML = `
            <p style="color: black;">💬System: First Budgeting Side Quest</p>
            <ul style="color: black;">
                <li>✅ Smart Grocery Shopping: Pick affordable and nutritious food choices without exceeding ₱2,000</li>
                <li>✅ Budget Stretching Challenge: Find a way to purchase essentials while saving at least ₱500 for emergencies.</li>
            </ul>
            <p style="color: black;">🎮Complete 2 Tasks in your first Side Quest!</p>
            <p style="color: red; font-weight: bold;">Note: Supermarket is close to bank</p>
            <button id="continueButtonNarration" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Continue</button>
        `;
        document.body.appendChild(systemNarration);
        document.getElementById('continueButtonNarration').addEventListener('click', toggleSystemNarrationModal);
    }
};

const updateNPC4InteractionButton = (characterPosition, interactionButton) => {
  const distanceToNPC = characterPosition.distanceTo(npc4Position);

  if (distanceToNPC <= interactionDistance) {
    interactionButton.innerText = 'Talk to Landlord';
    interactionButton.style.display = 'block';
    return true;
  }
  return false;
};

const handleNPC4InteractionClick = (interactionButton) => {
  if (interactionButton.innerText === 'Talk to Landlord') {
    document.getElementById('npc4Modal').style.display = 'block';
  }
};

const createNPC4InteractionButton = () => {
  const interactionButton = document.createElement('button');
  interactionButton.style.position = 'absolute';
  interactionButton.style.bottom = '20px';
  interactionButton.style.left = '50%';
  interactionButton.style.transform = 'translateX(-50%)';
  interactionButton.style.padding = '30px 60px';
  interactionButton.style.fontSize = '25px';
  interactionButton.style.backgroundColor = '#4CAF50';
  interactionButton.style.color = 'white';
  interactionButton.style.border = 'none';
  interactionButton.style.borderRadius = '5px';
  interactionButton.style.cursor = 'pointer';
  interactionButton.style.display = 'none';
  interactionButton.innerText = 'Talk to Landlord';
  document.body.appendChild(interactionButton);
  return interactionButton;
};

export { initializeNPC4Interaction, updateNPC4InteractionButton, handleNPC4InteractionClick, createNPC4InteractionButton, toggleSystemNarrationModal };