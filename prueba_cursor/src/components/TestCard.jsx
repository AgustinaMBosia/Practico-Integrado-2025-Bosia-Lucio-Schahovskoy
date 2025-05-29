import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivityCard from './ActivityCard'; // Ajusta la ruta si es necesario

const TestActivityCard = () => {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get('http://localhost:8080/actividad/1');
        setActivity(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchActivity();
  }, []);

  if (loading) return <div>Cargando actividad...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {activity ? (
        <ActivityCard activity={activity} isAdmin={true}/>
      ) : (
        <p>No se encontró la actividad con ID 1</p>
      )}
    </div>
  );
};

export default TestActivityCard;
