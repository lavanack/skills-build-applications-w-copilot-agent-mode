import { useEffect, useState } from 'react';

import { fetchCollection } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('workouts')
      .then((records) => {
        if (isMounted) {
          setWorkouts(records);
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
    return <p className="status-text">Loading workouts...</p>;
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Unable to load workouts.</p>;
  }

  return (
    <div className="data-grid">
      {workouts.map((workout) => (
        <article className="data-card" key={workout._id ?? workout.title}>
          <h2>{workout.title}</h2>
          <p>{workout.focusArea} / {workout.difficulty}</p>
          <dl>
            <div>
              <dt>Duration</dt>
              <dd>{workout.durationMinutes} minutes</dd>
            </div>
            <div>
              <dt>Best for</dt>
              <dd>{workout.recommendedForGoal}</dd>
            </div>
          </dl>
          <p className="muted-line">{workout.exercises?.join(', ')}</p>
        </article>
      ))}
    </div>
  );
}

export default Workouts;