import React from 'react';
import ActivityDetail from '../components/ActivityDetail';
import '../styles/activityPack.css';
import IconPack from '../components/IconPack';

const ActivityPage = () => {
  return (
    <div className="activity-page">
      <ActivityDetail />
      <IconPack/>
    </div>
  );
};

export default ActivityPage;