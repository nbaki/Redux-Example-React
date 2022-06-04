import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Classroom from './Classroom';
import Registration from './Registration';
import Home from './Home';
import { Provider } from 'react-redux';
import store from './redux/Store';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/classrooms" element={<Classroom />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
