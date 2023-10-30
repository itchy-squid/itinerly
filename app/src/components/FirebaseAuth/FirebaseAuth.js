// FirebaseUIAuth.js
import React, { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import { auth } from '../../config/firebase';

const signInSuccessUrl = '/';

export const FirebaseAuth = () => {

  useEffect(() => {
    const uiConfig = {
      signInSuccessUrl: signInSuccessUrl,
      signInOptions: [ firebase.auth.GoogleAuthProvider.PROVIDER_ID ],
      callbacks: {
        signInSuccessWithAuthResult: () => {
          return false; // Avoid redirect outside the app
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

  return <div id="firebaseui-auth-container"></div>;
}
