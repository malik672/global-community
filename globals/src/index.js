import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import About from './components/about';
import Form from "./components/Form";
import Content from "./components/Content";
import Campaign from "./components/Campaign";


ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App  />} />
      <Route path="about" element={<About/>}/>
      <Route path="Form" element={<Form/>}/>
      <Route path="Content" element={<Content/>}/>
      <Route path="Campaign" element={<Campaign/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
