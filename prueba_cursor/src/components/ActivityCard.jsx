import '../styles/ActivityCard.css';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activities/${activity.id}`);
  };

  return (
    <div className="activity-card" onClick={handleClick}>
      <h3>{activity.name}</h3>
      
      <div className="schedule-section">
        <div className="days-container">
          <p className="schedule-title"><strong>Días:</strong></p>
            {activity.days.map((day, index) => (
              <li key={`day-${index}`}>{day}</li>
            ))}
        </div>

        <div className="times-container">
          <p className="schedule-title"><strong>Horarios:</strong></p>
            {activity.time_slots.map((time, index) => (
              <li key={`time-${index}`}>{time}</li>
            ))}
        </div>
      </div>

      <p className="instructor"><strong>Profesor:</strong> {activity.instructor}</p>
     
    </div>
  );
};

export default ActivityCard;