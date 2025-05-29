import '../styles/ActivityCard.css';
import { useNavigate } from 'react-router-dom';

const ActivityCard = ({ activity, isAdmin = false }) => {
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    console.log('Eliminar actividad:', activity.id);
    window.location.reload();
  };

  const handleInfoClick = (e) => {
    e.stopPropagation();
    navigate(`/Activity/${activity.id}`);
  };

  const handleCardClick = () => {
    if (!isAdmin) {
      navigate(`/Activity/${activity.id}`);
    }
  };

  return (
    <div
      className={`activity-card ${isAdmin ? 'admin-card' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: isAdmin ? 'default' : 'pointer' }}
    >
      <h3>{activity.titulo}</h3>
      <div>
        <p><strong>Día:</strong> {activity.dia}</p>
        <p><strong>Horario:</strong> {activity.horario}</p>
        <p><strong>Profesor:</strong> {activity.nombre_instructor || 'Por asignar'}</p>
      </div>

      {isAdmin && (
        <>
          <div className="admin-overlay"></div>
          <div className="admin-controls">
            <button
              className="icon-button delete-button"
              onClick={handleDelete}
              title="Eliminar actividad"
            />
            <button
              className="icon-button info-button"
              onClick={handleInfoClick}
              title="Ver detalles"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityCard;
