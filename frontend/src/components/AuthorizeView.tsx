import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

interface User {
  email: string;
  roles: string[]; // always treat roles as array
}

export const UserContext = createContext<User | null>(null);

function AuthorizeView(props: {
  children: React.ReactNode;
  requiredRole?: string; // optional
}) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/pingauth`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );

        if (response.status === 401) {
          setAuthorized(false);
          return;
        }

        const data = await response.json();
        const userObj: User = {
          email: data.email,
          roles: Array.isArray(data.roles) ? data.roles : [], // ← guarantee array
        };

        setUser(userObj);

        // Role check
        if (!props.requiredRole || userObj.roles.includes(props.requiredRole)) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      } catch (err) {
        console.error('Pingauth failed:', err);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [props.requiredRole]);

  if (loading) return <p>Loading...</p>;

  if (!authorized) return <Navigate to="/LandingPage" />;

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);
  if (!user) return null;
  return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeView;
