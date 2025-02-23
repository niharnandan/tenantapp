import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { auth, db } from './firebaseConfig'; // Import Firestore and auth
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

import './App.css'; // Your CSS or Tailwind

function App() {
  const [user, setUser] = useState<any>(null); // Store the logged-in user data
  const [role, setRole] = useState<string | null>(null); // Store the user's role
  const [error, setError] = useState<string>(''); // Error handling state

  // Google login handler
  const handleGoogleLogin = async (response: any) => {
    try {
      // Sign in with Firebase using Google credentials
      const credential = GoogleAuthProvider.credential(response.credential);
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      // Handle user state after login
      setUser(user);
      console.log('User signed in:', user.displayName);

      // Ensure user.email is not null before querying Firestore
      if (user.email) {
        // Query Firestore for user document
        const docRef = doc(db, "users", user.email); // Firestore path to check the user document
        const docSnap = await getDoc(docRef); // Get the document snapshot

        if (docSnap.exists()) {
          setRole(docSnap.data()?.role || ''); // Get role from Firestore document
          setError(''); // Clear error if user is found
        } else {
          setRole(null); // No role found
          setError('Email not found'); // Show error message
        }
      } else {
        setError('No email found for the user.');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      setError('An error occurred during login.');
    }
  };

  // Google login error handler
  const handleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <div className="App min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
          
          {!user ? (
            <div className="flex h-full items-center justify-center">
            <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={handleError}
                useOneTap={true}
                theme="outline"
                shape="pill"
                width="250"
            />
          </div>
            
          ) : (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Welcome, {user.displayName}</h2>
              <p className="text-lg mt-2">{user.email}</p>
              <p className="text-lg mt-2">Role: {role ? role : 'No role assigned'}</p>
            </div>
          )}

          {error && (
            <div className="mt-4 text-red-500">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
