import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ClassroomList from './ClassroomList';
import Students from './Students';

// useState is a hook function that allows us to "hook" into React lifecycle and state logic
// useState takes an argument -> default value of your state data

// React renders our function first time
// Classroom();
// State changes
// React renders again
// Classroom();

function Classroom(props) {
  let [subject, setSubject] = useState('Sample Subject'); // returns [data, functionToSetData]
  let [userEntry, setUserEntry] = useState('');

  const registeredClasses = useSelector(state => state.registeredClasses); // selects the "registeredClasses" property out of the redux state object

  /*
    State vs Props:
    State:
      - Data that is "writeable"
      - Local/private data to this component only
    Props:
      - Data that is "readonly"
      - Given by our parent component
  */
  const handleButton = () => {
    // save whatever was in the subject input field
    console.log('Button clicking');
    console.log('Im about add the subject', userEntry);

    setSubject(userEntry); // subject = userEntry
  }

  const handleInput = (event) => {
    let userInput = event.target.value;
    console.log('The subject is', userInput);
    setUserEntry(userInput);
  }

  /*
    App renders Classroom [Classroom()] ->
    Classroom returns JSX (renders itself) ->
    State changing from input event handling ->
      -> React re-renders
    State changing from buttin click handling ->
      -> React re-renders
    Classroom renders the most up-to-date JSX
  */

  // registeredClasses = { class: 'Bootstrap', name: 'Nas' }

  return (
    <section id="container">
      <section id="classroom-form">
        <h1>Add Classroom Subject</h1>
        <h2>{props.myData}</h2>
        <input type="text" placeholder="enter subject" onKeyUp={handleInput} />
        <button onClick={handleButton}>Add</button>
      </section>
      <section id="subjects">
        <h2>Subjects</h2>
        <p>{subject}</p>
      </section>
      <section id="registered-class-list">
        <h3>Registered Classes</h3>
        <table>
          <thead>
            <th>Classroom Title</th>
            <th>Registrant Name</th>
          </thead>
          {registeredClasses.map(classroom => {
            return (<ClassroomList classroom={classroom} />)
          })}
        </table>
        
        {/* Show my registered classes */}
        {/* <p>Classroom Subject: {registeredClasses.class}</p>
        <p>Registrant Name: {registeredClasses.name}</p> */}
      </section>
      {/* <Students numOfStudents={props.numOfStudents} /> */}
    </section>
  );
};

export default Classroom;