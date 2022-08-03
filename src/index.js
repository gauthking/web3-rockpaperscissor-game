import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoralisProvider } from 'react-moralis';
const root = ReactDOM.createRoot(document.getElementById('root'));
const appId = 'Paste in your moralis dApp appID';
const serverUrl = "Paste in your moralis dApp serverURL";

root.render(
  <React.StrictMode>
    <MoralisProvider appId={appId} serverUrl={serverUrl}>
      <App />
    </MoralisProvider>
  </React.StrictMode>
);

