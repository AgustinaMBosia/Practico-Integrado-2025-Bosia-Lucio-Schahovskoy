import '../styles/activityCard.css';

const ActivityCard = ({ activity }) => {
  const handleClick = () => {
    window.location.href = `/actividad/${activity.id}`;
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