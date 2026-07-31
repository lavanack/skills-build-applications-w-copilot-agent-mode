import { useEffect, useState } from 'react';

import { fetchCollection } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('teams')
      .then((records) => {
        if (isMounted) {
          setTeams(records);
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
    return <p className="status-text">Loading teams...</p>;
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Unable to load teams.</p>;
  }

  return (
    <div className="data-grid">
      {teams.map((team) => (
        <article className="data-card" key={team._id ?? team.name}>
          <h2>{team.name}</h2>
          <p>{team.city}</p>
          <dl>
            <div>
              <dt>Mascot</dt>
              <dd>{team.mascot}</dd>
            </div>
            <div>
              <dt>Weekly goal</dt>
              <dd>{team.weeklyGoalMinutes} minutes</dd>
            </div>
          </dl>
          <p className="muted-line">{team.members?.join(', ')}</p>
        </article>
      ))}
    </div>
  );
}

export default Teams;