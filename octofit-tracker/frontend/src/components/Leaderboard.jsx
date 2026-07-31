import { useEffect, useState } from 'react';

import { fetchCollection } from '../api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('leaderboard')
      .then((records) => {
        if (isMounted) {
          setEntries(records);
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
    return <p className="status-text">Loading leaderboard...</p>;
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Unable to load leaderboard.</p>;
  }

  return (
    <ol className="leaderboard-list">
      {entries.map((entry) => (
        <li key={entry._id ?? entry.rank}>
          <span className="rank">#{entry.rank}</span>
          <div>
            <strong>{entry.userName}</strong>
            <span>{entry.teamName}</span>
          </div>
          <span>{entry.totalMinutes} min</span>
          <span>{entry.totalCalories} cal</span>
        </li>
      ))}
    </ol>
  );
}

export default Leaderboard;