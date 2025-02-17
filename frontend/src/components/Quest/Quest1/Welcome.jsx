import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html, body {
    min-height: 100%;
    height: 100%;
    background-color: #f0f0f0;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 200;
    color: black;
  }
  html.modal-active, body.modal-active {
    overflow: hidden;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.5s ease-out;
  z-index: 200;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 90%;
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Welcome = ({ onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const handleClose = () => {
    setShowModal(false);
    onClose();
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
        <ModalContainer>
          <ModalContent>
            <Logo src="https://res.cloudinary.com/dwp8u82sd/image/upload/v1739112641/1_wkftfu.png" alt="Logo" />
            <Title>Welcome to the Finance Quest!</Title>
            <button onClick={handleClose}>Start</button>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
};

export default Welcome;