import '../styles/ActivityCard.css';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Activities/${activity.id}`);
  };

  return (
    <div className="activity-card" onClick={handleClick}>
      <h3>{activity.titulo}</h3>
      
      <div className="schedule-section">
        <div className="day-time-item">
          <p><strong>Día:</strong> {activity.dia}</p>
        </div>
        <div className="day-time-item">
          <p><strong>Horario:</strong> {activity.horario}</p>
        </div>
        <div>
          <p><strong>Cupo:</strong> {activity.cupo}</p>
        </div>
      </div>

      <p className="instructor"><strong>Profesor:</strong> {activity.Instructor?.Nombre || 'Por asignar'}</p>
    </div>
  );
};

export default ActivityCard;