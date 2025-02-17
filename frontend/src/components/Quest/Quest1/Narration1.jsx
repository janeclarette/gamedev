import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    min-height: 100%;
    height: 100%;
    background-image: url(http://theartmad.com/wp-content/uploads/Dark-Grey-Texture-Wallpaper-5.jpg);
    background-size: cover;
    background-position: top center;
    font-family: helvetica neue, helvetica, arial, sans-serif;
    font-weight: 200;
    color: black; /* Set font color to black */
  }
  html.modal-active, body.modal-active {
    overflow: hidden;
  }
`;

const unfoldIn = keyframes`
  0% {
    transform: scaleY(0.01) scaleX(0);
  }
  50% {
    transform: scaleY(0.01) scaleX(1);
  }
  100% {
    transform: scaleY(1) scaleX(1);
  }
`;

const unfoldOut = keyframes`
  0% {
    transform: scaleY(1) scaleX(1);
  }
  50% {
    transform: scaleY(0.01) scaleX(1);
  }
  100% {
    transform: scaleY(0.01) scaleX(0);
  }
`;

const zoomIn = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  display: table;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(0);
  z-index: 1;
  color: #000;

  &.one {
    transform: scaleY(0.01) scaleX(0);
    animation: ${unfoldIn} 1s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  &.one .modal-background .modal {
    transform: scale(0);
    animation: ${zoomIn} 0.5s 0.8s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  &.one.out {
    transform: scale(1);
    animation: ${unfoldOut} 1s 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  &.one.out .modal-background .modal {
    animation: ${zoomOut} 0.5s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }

  &.two {
    transform: scale(1);
  }
`;

const ModalBackground = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
`;

const Modal = styled.div`
  display: inline-block;
  background: white;
  padding: 20px;
  border: 1px solid black;
  color: black; /* Set font color to black */
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  text-align: left;

  h2, p {
    color: black; /* Ensure font color is black */
  }

  button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #000;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #444;
  }
`;

const Narration1 = ({ onContinue }) => {
  const [showModal, setShowModal] = useState(true);

  const handleContinue = () => {
    setShowModal(false);
    onContinue();
  };

  useEffect(() => {
    if (showModal) {
      document.documentElement.classList.add('modal-active');
      document.body.classList.add('modal-active');
    } else {
      document.documentElement.classList.remove('modal-active');
      document.body.classList.remove('modal-active');
    }
  }, [showModal]);

  return (
    <>
      <GlobalStyle />
      {showModal && (
        <ModalContainer id="modal-container" className="one">
          <ModalBackground className="modal-background">
            <Modal className="modal">
              <h2>🎓 Quest 1: Arrival in Manila and First Budgeting Challenge</h2>
              <p>📍 Location: Liza’s Boarding House</p>
              <p>System: Liza arrives at her rented space in a modest boarding house in Sampaloc, Manila. She shares the space with other students.</p>
              <button onClick={handleContinue}>Continue</button>
            </Modal>
          </ModalBackground>
        </ModalContainer>
      )}
    </>
  );
};

export default Narration1;