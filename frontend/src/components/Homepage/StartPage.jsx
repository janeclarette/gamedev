import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Keyframe animation for bouncing effect
const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Global styles to reset margin/padding and ensure full height/width
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
`;

const StartPageWrapper = styled.div`
  font-family: 'Gravitas One', sans-serif;
  height: 100vh;
  margin: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  cursor: pointer;
`;

const TiledBackground = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  z-index: 0;
  
  div {
    width: 100%;
    height: 100%;
    background-color: #331540;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
  }

  /* Hover Gradients Row by Row */
  div:nth-child(-n + 10):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }

  div:nth-child(n + 11):nth-child(-n + 20):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }

  div:nth-child(n + 21):nth-child(-n + 30):hover {
    background: linear-gradient(180deg, #331540, #451d6b);
  }

  div:nth-child(n + 31):nth-child(-n + 40):hover {
    background: linear-gradient(180deg, #451d6b, #8c2fc7);
  }

  div:nth-child(n + 41):nth-child(-n + 50):hover {
    background: linear-gradient(180deg, #451d6b, #8c2fc7);
  }

  div:nth-child(n + 51):nth-child(-n + 60):hover {
    background: linear-gradient(180deg, #8c2fc7, #00cac9);
  }

  div:nth-child(n + 61):nth-child(-n + 70):hover {
    background: linear-gradient(180deg, #8c2fc7, #00cac9);
  }

  div:nth-child(n + 71):nth-child(-n + 80):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }

  div:nth-child(n + 81):nth-child(-n + 90):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }

  div:nth-child(n + 91):nth-child(-n + 100):hover {
    background: linear-gradient(180deg, #00cac9, #331540);
  }
`;

const Content = styled.div`
  text-align: center;
  z-index: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GameTitle = styled.div`
  margin-top: 40px;
  font-size: 100px;
  text-transform: uppercase;
  animation: ${bounce} 1s infinite alternate;
  background: #451d6b;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-stroke: 1px black;
  display: inline-block;
  transform: rotate(15deg);
  transform-origin: bottom center;
`;

const GameTitle1 = styled.div`
  font-size: 70px;
  margin-bottom: 40px;
  text-transform: uppercase;
  animation: ${bounce} 1s infinite alternate;
  background: #451d6b;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-stroke: 1px black;
`;

const Button = styled.button`
  background: transparent;
  border: 2px black;
  color: ${(props) => (props.selected ? "black" : "white")};
  font-size: 20px;
  font-family: 'Fraunces', sans-serif;
  margin-top: 25px;
  margin-bottom: 2px;
  border-radius: 25px;
  cursor: pointer;
  opacity: 0.9;
  width: 200px;
  transition: 0.3s;

  &:hover {
    background-color: rgba(156, 170, 241, 0.2);
    opacity: 3;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const StartPage = () => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const buttons = [
    { label: "START", onClick: () => navigate("/gameplay") },
    { label: "MENU", onClick: () => navigate("/menu") },
    { label: "HOW TO PLAY", onClick: () => navigate("/howtoplay") },
    { label: "LEADERBOARDS", onClick: () => navigate("/leaderboards") },
    { label: "HOME", onClick: () => navigate("/") }
  ];

  const handleKeyPress = (e) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % buttons.length);
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? buttons.length - 1 : prevIndex - 1
      );
    } else if (e.key === "Enter") {
      buttons[selectedIndex].onClick();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedIndex]);

  return (
    <>
      <GlobalStyle />
      <StartPageWrapper>
        <TiledBackground>
          {Array.from({ length: 100 }, (_, index) => (
            <div key={index} />
          ))}
        </TiledBackground>

        <Content>
          <GameTitle>Finance</GameTitle>
          <GameTitle1>Quest</GameTitle1>

          {buttons.map((button, index) => (
            <Button
              key={index}
              selected={selectedIndex === index}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}
        </Content>
      </StartPageWrapper>
    </>
  );
};

export default StartPage;
