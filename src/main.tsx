import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter as Router } from 'react-router-dom';
import { Providers } from './Provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </Router>
    </Providers>
  </StrictMode>
);
