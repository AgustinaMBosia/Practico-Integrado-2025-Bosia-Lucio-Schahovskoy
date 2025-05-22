import '../styles/activityCard.css';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/Activities/${activity.id}`);
  };

  return (
    <div className="activity-card" onClick={handleClick}>
      <h3>{activity.nombre}</h3>
      <p><strong>Día:</strong> {activity.dia}</p>
      <p><strong>Horario:</strong> {activity.horario}</p>
      <p><strong>Profesor:</strong> {activity.profesor}</p>
    </div>
  );
};

export default ActivityCard;
