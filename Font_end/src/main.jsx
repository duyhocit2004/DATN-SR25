import React from "react";
import App from './App.jsx'
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Import Bootstrap & jQuery
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'jquery';

// Import FontAwesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import file CSS chính
import './assets/css/demo4.min.css';


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
