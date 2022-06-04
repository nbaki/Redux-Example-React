import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Classroom from './Classroom';
import { NavLink as RRNavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggle, NavLink, Collapse, Nav, NavItem, NavbarToggler } from 'reactstrap';

function App() {
  const [loadedStudents, setLoadedStudents] = useState(0);
  const handleLoadStudents = (e) => {
    setLoadedStudents(100)
  }
  return (
    <div className="App">
      <Navbar color="light" expand="md" light className="mb-5">
        <NavbarBrand href="/">
          Classroom Management
        </NavbarBrand>
        <NavbarToggler onClick={() => {}} />
        <Collapse navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={RRNavLink} to="/classrooms">Classrooms</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/registration">Register</NavLink>
            </NavItem>
            {/* <NavItem>
              <button onClick={handleLoadStudents}>Load Students</button>
            </NavItem> */}
          </Nav>
        </Collapse>
      </Navbar>

      {/* <Classroom numOfStudents={loadedStudents} myData={123} foo="bar" /> */}
      
    </div>
  );
}

export default App;
