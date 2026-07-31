import { useEffect, useState } from 'react';

import { fetchCollection } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('activities')
      .then((records) => {
        if (isMounted) {
          setActivities(records);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (isMounted) {
          setStatus('error');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'loading') {
    return <p className="status-text">Loading activities...</p>;
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Unable to load activities.</p>;
  }

  return (
    <div className="data-table-wrap">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Activity</th>
            <th>Team</th>
            <th>Duration</th>
            <th>Calories</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id ?? `${activity.userEmail}-${activity.activityDate}`}>
              <td>
                <strong>{activity.type}</strong>
                <span>{activity.userEmail}</span>
              </td>
              <td>{activity.teamName}</td>
              <td>{activity.durationMinutes} min</td>
              <td>{activity.caloriesBurned}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;