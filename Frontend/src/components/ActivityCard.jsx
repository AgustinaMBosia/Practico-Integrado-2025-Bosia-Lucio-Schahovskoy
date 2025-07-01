import '../styles/ActivityCard.css';
import { useNavigate } from 'react-router-dom';

/**
 * Componente que muestra una tarjeta con info acotada de una actividad.
 */
const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/Activity/${activity.id}`);
  };

  return (
    <div
      className="activity-card"
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <h3>{activity.titulo}</h3>
      <div>
        <p><strong>Día:</strong> {activity.dia}</p>
        <p><strong>Horario:</strong> {activity.horario}</p>
        <p><strong>Profesor:</strong> {activity.nombre_instructor || 'Por asignar'}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
