
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App.jsx';


const root = document.getElementById('root');
const vroot = createRoot(root);
vroot.render(React.createElement(App))