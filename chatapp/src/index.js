import React from 'react';
import ReactDOM from 'react-dom';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { MicrosoftSignIn } from './MicrosoftSignIn';

// MSAL configuration
const msalConfig = {
  auth: {
    clientId: '7fee19fd-ae35-40e1-b839-4df871783dcd',  // Replace with your actual Client ID
    authority: 'https://login.microsoftonline.com/common',
    redirectUri: window.location.origin,  // The URI to redirect to after authentication
  },
};

const initializeApp = async () => {
  const msalInstance = await PublicClientApplication.createPublicClientApplication(msalConfig);
  createRoot(document.getElementById('root')).render(
    <MsalProvider instance={msalInstance}>
      <MicrosoftSignIn />
    </MsalProvider>
  );
};

initializeApp();

