// FirebaseUIAuth.js
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../../config/firebase';
import { Box } from '@mui/system';

const signInSuccessUrl = '/login';

export const LoginComponent = () => {

  useEffect(() => {
    const uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: signInSuccessUrl,
      signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          return false; // Avoid redirect outside the app
        },
        signInFailure: (error) => {
          console.error("Error during sign-in:", error)
          return Promise.resolve();
        }
      }
    };

    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', uiConfig);

    return () => {
      // Cleanup UI on unmount
      ui.reset();
    };
  }, []);

  return (
    <Box sx={{paddingTop: '16px', paddingBottom: '16px'}}>
      <div id="firebaseui-auth-container"/>
    </Box>
  );
}
