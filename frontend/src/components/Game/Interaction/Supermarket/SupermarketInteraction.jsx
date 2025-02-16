import * as THREE from 'three';
import { createSupermarketModal, createCongratulatoryModal, showBudgetingLessonModal } from './modals';
import { initializeSupermarketInteraction, updateSupermarketInteractionButton, handleSupermarketInteractionClick } from './maincomponent';


const initInteract_SM = () => {
  initializeSupermarketInteraction();
  createSupermarketModal()
  createCongratulatoryModal();
  showBudgetingLessonModal();
};

const updInteractBtn_SM = (characterPosition, interactionButton) => {
  return updateSupermarketInteractionButton(characterPosition, interactionButton);
};

const handleInteractClk_SM = () => {
  handleSupermarketInteractionClick();
};

export { initInteract_SM, updInteractBtn_SM, handleInteractClk_SM};