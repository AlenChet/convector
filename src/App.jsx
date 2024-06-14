import React, { useState } from 'react';
import './styles/App.css';

function App() {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setHex(value);

    if (value.length === 7) {
      if (/^#[0-9A-F]{6}$/i.test(value)) {
        const rgbValue = hexToRgb(value);
        setRgb(rgbValue);
        setIsError(false);
      } else {
        setRgb('');
        setIsError(true);
      }
    } else {
      setRgb('');
      setIsError(false);
    }
  };

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div className="App" style={{ backgroundColor: isError ? 'red' : (hex.length === 7 ? hex : 'white') }}>
      <form>
        <label>
          Из HEX в rgb:
          <input type="text" value={hex} onChange={handleChange} />
        </label>
      </form>
      {isError ? <div className="error">Ошибка: некорректный HEX-код</div> : <div className="rgb-output">{rgb}</div>}
    </div>
  );
}

export default App;
