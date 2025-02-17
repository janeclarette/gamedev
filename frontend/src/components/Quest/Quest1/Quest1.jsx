import React, { useState } from 'react';
import Welcome from './Welcome';
import SystemNarration1 from './SystemNarration1';
import Narration1 from './Narration1';
import SystemNarration2 from './SystemNarration2';

const Quest1 = ({ onComplete }) => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [showSystem1, setShowSystem1] = useState(false);
  const [showNarration1, setShowNarration1] = useState(false);
  const [showSystem2, setShowSystem2] = useState(false);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    setShowSystem1(true);
  };

  const handleSystem1Continue = () => {
    setShowSystem1(false);
    setShowNarration1(true);
  };

  const handleNarration1Continue = () => {
    setShowNarration1(false);
    setShowSystem2(true);
  };

  const handleSystem2Continue = () => {
    setShowSystem2(false);
    onComplete();
  };

  return (
    <>
      {showWelcome && <Welcome onClose={handleWelcomeClose} />}
      {showSystem1 && <SystemNarration1 onContinue={handleSystem1Continue} />}
      {showNarration1 && <Narration1 onContinue={handleNarration1Continue} />}
      {showSystem2 && <SystemNarration2 onContinue={handleSystem2Continue} />}
    </>
  );
};

export default Quest1;