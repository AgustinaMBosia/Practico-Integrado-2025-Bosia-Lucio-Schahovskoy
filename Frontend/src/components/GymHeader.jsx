import React from 'react';
import '../styles/GymHeader.css';

// Header del gimnasio, reutilizable en páginas, sin funcionalidades aparte de estética
const GymHeader = () => {
    return (
        <div className="gym-header">
            <div className="gym-name">
                BURNOUT
            </div>
            <div className="gym-subtitle">
                GIMNASIO
            </div>
        </div>
    );
};

export default GymHeader;