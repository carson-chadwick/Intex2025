import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom';

interface User {
  email: string;
}

export const UserContext = createContext<User | null>(null);

function AuthorizeView(props: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // add a loading state
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchWithRetry(url: string, options: any) {
      try {
        const response = await fetch(url, options);

        // ✅ If unauthorized, don't treat it like a crash
        if (response.status === 401) {
          setAuthorized(false);
          return;
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid response format from server');
        }

        const data = await response.json();

        if (data.email) {
          setUser({ email: data.email });
          setAuthorized(true);
        } else {
          throw new Error('Invalid user session');
        }
      } catch (error) {
        console.error('Pingauth error:', error);
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    }

    fetchWithRetry(`${import.meta.env.VITE_API_URL}/pingauth`, {
      method: 'GET',
      credentials: 'include',
    });
  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (authorized) {
    return (
      <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
    );
  }

  return <Navigate to="/login" />;
}

export function AuthorizedUser(props: { value: string }) {
  const user = React.useContext(UserContext);

  if (!user) return null; // Prevents errors if context is null

  return props.value === 'email' ? <>{user.email}</> : null;
}

export default AuthorizeView;
