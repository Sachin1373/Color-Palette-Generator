import React, { useState } from 'react';
import { CiUnlock } from "react-icons/ci";
import { CiLock } from "react-icons/ci";
import '../Styles/Cards.css';

function Cards({ colors, onToggleLock, locked }) {


  const copyToClipboard = (hexCode) => {
    navigator.clipboard.writeText(hexCode).then(() => {
      alert(`Copied: ${hexCode}`); 
      console.error('Failed to copy!', err);
    });
  };

  return (
    <div>
      <div className="container">
        {colors.map((color, index) => (
          <div 
            key={index} 
            className="color-card" 
            onClick={() => copyToClipboard(color)} 
            style={{ cursor: 'pointer', position: 'relative' }} 
          >
            <div className="color" style={{ backgroundColor: color }}></div>
            <div className="hex-code">{color}</div>
            <button 
              className="lock-button" 
              onClick={(e) => {
                e.stopPropagation(); 
                onToggleLock(index);
              }}
              
            >
              {locked[index] ? <CiLock /> : <CiUnlock />} 
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
