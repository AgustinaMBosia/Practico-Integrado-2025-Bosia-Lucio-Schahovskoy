import React from 'react';
import ActivityCard from './ActivityCard';
import '../styles/ActivityList.css';
import { useUser } from '../context/UserContext';


const ActivityList = ({ activities = [], title, emptyMessage }) => {
    const { isAdmin } = useUser();
    return (
        <div className="activity-list-container">
            <div className="fixed-title">{title}</div>
            <div className="scrollable-list">
                {activities && activities.length > 0 ? (
                    <div className="activities-grid">
                        {activities.map(activity => (
                            <ActivityCard 
                                key={activity.id} 
                                activity={activity} 
                                isAdmin={isAdmin}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="empty-message">{emptyMessage || "No hay actividades disponibles."}</p>
                )}
            </div>
        </div>
    );
};

export default ActivityList;