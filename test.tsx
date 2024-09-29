import React, { useEffect, useState } from 'react';
import { auth } from './firebase'; // Import your Firebase setup

const AuthComponent = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <p>Welcome, {user.email}!</p> : <p>No user is logged in.</p>}
    </div>
  );
};

export default AuthComponent;
