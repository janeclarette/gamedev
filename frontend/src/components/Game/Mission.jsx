import React, { useState } from 'react';
import './Mission.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Mission = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMissions = () => {
    setIsOpen(!isOpen);
  };

  const missions = [
    { id: 1, name: 'Get Accepted into University', completed: false},
    { id: 2, name: 'Find a Part-Time Job', completed: false },
    { id: 3, name: 'Create a Weekly Budget Plan', completed: false },
  ];

  return (
    <div className={`mission-container ${isOpen ? 'open' : ''}`} onClick={toggleMissions}>
      <div className="mission-header">
        <h3>Missions</h3>
      </div>
      {isOpen && (
        <div className="mission-list">
          {missions.map(mission => (
            <div key={mission.id} className="mission-item">
              <span>{mission.name}</span>
              <FontAwesomeIcon
                icon={mission.completed ? faCheck : faTimes}
                className={`mission-status ${mission.completed ? 'completed' : 'not-completed'}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Mission;