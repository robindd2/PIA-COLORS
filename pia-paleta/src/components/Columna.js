import React from 'react';
import './Columna.css';

import { FaCopy, FaLock, FaArrowsAltH } from 'react-icons/fa';

const Columna = (props) => {
  const colorCode = props.color;


  const handleCopy = (event) => {

    event.stopPropagation(); 
    navigator.clipboard.writeText(colorCode);
    alert(`¡Copiado al portapapeles: ${colorCode}!`);
  };

  return (
    <div className="color-column" style={{ backgroundColor: colorCode }}>
      
   
      <div className="color-code-container">
        <span className="color-code">{colorCode}</span>
      </div>

      
      <div className="icon-container">
        <FaCopy className="icon" onClick={handleCopy} title="Copiar" />
        <FaLock className="icon" title="Bloquear (función no implementada)" />
        <FaArrowsAltH className="icon" title="Mover (función no implementada)" />
      </div>

    </div>
  );
};

export default Columna;