import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <h1>Bienvenido a nuestra plataforma</h1>
        <p>Descubre todas las actividades disponibles</p>
      </section>
      
      <section className="featured-section">
        <h2>Actividades Destacadas</h2>
        <div className="activities-grid">
          {/* Aquí irán las actividades destacadas */}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 