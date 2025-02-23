import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './Css/index.css'
import { BrowserRouter } from 'react-router-dom';
import DContext from './Components/Datacontext/DataContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <DContext>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DContext>


);


