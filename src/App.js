import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Classroom from './Classroom';
import { Link } from 'react-router-dom';

function App() {
  const [loadedStudents, setLoadedStudents] = useState(0);
  const handleLoadStudents = (e) => {
    setLoadedStudents(100)
  }
  return (
    <div className="App">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/classrooms">Classrooms</Link></li>
        <li><Link to="/registration">Registration</Link></li>
      </ul>
      {/* <Classroom numOfStudents={loadedStudents} myData={123} foo="bar" /> */}
      <button onClick={handleLoadStudents}>Load Students</button>
    </div>
  );
}

export default App;
