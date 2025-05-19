// src/components/ActivityDetail.jsx
import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

const ActivityDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [enrollmentStatus, setEnrollmentStatus] = useState(null);
  
  const activity = activities.find(a => a.id === parseInt(id));

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Simular inscripción (éxito o fallo aleatorio)
    const success = Math.random() > 0.3;
    setEnrollmentStatus(success ? 'success' : 'fail');
    
    if (success) {
      activity.enrolled = true;
    }
  };

  if (!activity) return <div>Actividad no encontrada</div>;

  return (
    <div className="activity-detail">
      <h2>{activity.name}</h2>
      
      {enrollmentStatus === 'success' ? (
        <div className="success-message">
          <h3>INSCRIPCIÓN EXITOSA</h3>
          <p>¡Te has inscrito correctamente a esta actividad!</p>
          <button onClick={() => setEnrollmentStatus(null)}>Volver</button>
        </div>
      ) : enrollmentStatus === 'fail' ? (
        <div className="fail-message">
          <h3>INSCRIPCIÓN FALLIDA</h3>
          <p>No se pudo completar la inscripción. Inténtalo de nuevo.</p>
          <button onClick={() => setEnrollmentStatus(null)}>Volver a intentar</button>
        </div>
      ) : (
        <>
          <p><strong>Cupo disponible:</strong> {activity.capacity} personas por horario</p>
          <p><strong>Descripción:</strong> {activity.description}</p>
          <p><strong>Horario y duración:</strong> {activity.schedule}</p>
          <p><strong>Instructor:</strong> {activity.instructor}</p>
          
          <button 
            onClick={handleEnroll} 
            disabled={activity.enrolled}
            className="enroll-button"
          >
            {activity.enrolled ? 'Ya estás inscrito' : 'INSCRIBITE'}
          </button>
        </>
      )}
    </div>
  );
};

export default ActivityDetail;