//import react and components

import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './components/app';

const root = createRoot(document.getElementById('root'));

root.render (
     <App />
);

