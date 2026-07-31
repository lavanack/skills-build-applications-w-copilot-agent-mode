import { useEffect, useState } from 'react';

import { fetchCollection } from '../api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('users')
      .then((records) => {
        if (isMounted) {
          setUsers(records);
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
    return <p className="status-text">Loading users...</p>;
  }

  if (status === 'error') {
    return <p className="status-text text-danger">Unable to load users.</p>;
  }

  return (
    <div className="data-grid">
      {users.map((user) => (
        <article className="data-card" key={user._id ?? user.email}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <dl>
            <div>
              <dt>Team</dt>
              <dd>{user.teamName}</dd>
            </div>
            <div>
              <dt>Goal</dt>
              <dd>{user.fitnessGoal}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

export default Users;