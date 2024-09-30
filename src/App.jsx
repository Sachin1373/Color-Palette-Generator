import React, { useState, useRef, useEffect } from 'react';
import Cards from './Components/Cards';
import './Styles/App.css';

function App() {
  const [colors, setColors] = useState([]);   // Palette colors
  const [locked, setLocked] = useState([false, false, false, false, false]); // Locks for colors

  // Convert RGB to Hex
  const rgbToHex = (r, g, b) => {
    return (
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('')
    );
  };

  // Fetch new colors from the Colormind API
  const fetchColors = async () => {
    try {
      const response = await fetch('http://colormind.io/api/', {
        method: 'POST',
        body: JSON.stringify({ model: 'default' }),
      });
      const data = await response.json();
      
      // Map new colors, but only change the colors that are not locked
      const newColors = data.result.map((color, index) => 
        locked[index] ? colors[index] : rgbToHex(color[0], color[1], color[2])
      );
      setColors(newColors);
    } catch (error) {
      console.error('Error fetching colors:', error);
    }
  };

  // Handle spacebar press to regenerate palette
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        fetchColors(); // Regenerate palette when spacebar is pressed
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [locked, colors]); // Watch locked and colors state

  // Toggle the lock for a specific color
  const toggleLock = (index) => {
    setLocked((prevLocked) =>
      prevLocked.map((lock, i) => (i === index ? !lock : lock))
    );
  };

  // Fetch colors on initial mount
  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Color Palette Generator</h1>
        <div className="cards">
          <Cards colors={colors} onToggleLock={toggleLock} locked={locked} />
        </div>
        <div className="btn">
          <button className='generate' onClick={fetchColors}>Generate Palette</button>
          <p>Or just press the "Spacebar" to generate new palettes</p>
        </div>
      </div>
    </>
  );
}

export default App;
