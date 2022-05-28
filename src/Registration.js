import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerClass } from './redux/ClassroomActions';

const TIMER = 60;

function Registration(props) {
  const [registrationTimer, setRegistrationTimer] = useState(TIMER);
  const [timerIntervalCallback, setTimerIntervalCallback] = useState();
  const [timerInterval, setTimerInterval] = useState();
  const [registrationData, setRegistrationData] = useState({});

  const dispatch = useDispatch(); // returns a dispatcher function

  /* Lifecycle methods 
    - first time it renders
    - any time it updates
    - removing component
  */

  /* useEffect hook: Side effect function
    - When component renders for the first time, create a side effect function
    - Takes 2 main arguments:
      1. A callback function
      2. Data to "watch" - Array of data
    Return a function out of useEffect -- this is considered the cleanup function
  */

  // Run this side effect anytme 'registrationTimer' changes
  useEffect(() => {
    console.log("running sideeffect")
    if (registrationTimer === 0) {
      // remove the interval
      clearInterval(timerInterval);
    } else if (registrationTimer === TIMER) {
      // setInterval(timerInterval);
      console.log('timercallback', timerIntervalCallback);
      setInterval(timerIntervalCallback, 1000) // ms
  
      // setTimerInterval(interval);
    }
  }, [registrationTimer, timerIntervalCallback]);

  // this side effect runs during every single re-render
  // useEffect(() => {
  //   console.log('rerendering');
  // });

  useEffect(() => {
    // setTimeout() = Runs some code after some time elapses
    const intervalCallback = () => {
      setRegistrationTimer(timer => timer - 1); // subtract 1 every second
    };
    const interval = setInterval(intervalCallback, 1000) // ms

    setTimerIntervalCallback(intervalCallback);
    setTimerInterval(interval);
    // Cleanup when component unmounts
    return () => {
      clearInterval(interval);
    }
  }, []); // Empty array [] is equivalent to running the side effect of the first component render

  // setRegistrationTimer(40); setRegistrationTimer(data => data - 20);
  /*
    1. Allow user to register for a class within timer window
    2. If they "register" within timer, output what they entered
    3. If timer elapses, stop user from registering
      -- Clear the HTML
  */

  const handleSubmit = (event) => {
    // Trigger an action in redux
    event.preventDefault();
    console.log(registrationData);

    dispatch(registerClass(registrationData)); // officially dispatch our 'registerClass' action
  }

  const handleClassSelection = (event) => {
    let value = event.target.value;
    // console.log('class is', value);
    let data = {
      class: value // class: 'React'
    };
    setRegistrationData(prevState => ({...prevState, ...data}));
  }

  const handleName = (event) => {
    let value = event.target.value;
    let data = {
      name: value
    }
    setRegistrationData(prevState => ({...prevState, ...data}));
  }
  return (
    <section id="registration-form">
      <h1>Welcome! Please register for your class.</h1>
      <h2>You have {registrationTimer} seconds to register.</h2>

      {/* Conditional Rendering */}
      { registrationTimer > 0 &&
        <form onSubmit={handleSubmit}>
          <label>Class:</label>
          <select onChange={handleClassSelection}>
            <option>-- Select a class --</option>
            <option value="React">React</option>
            <option value="Bootstrap">Bootstrap</option>
            <option value="HTML">HTML</option>
          </select>
          <br />
          <label>Name:</label>
          <input type="text" placeholder="Enter name" onKeyUp={handleName} /><br />
          <input type="submit" value="Register" />
        </form>
      }

      <br /><br /><br />
      <button onClick={() => setRegistrationTimer(data => data - 1)}>Manual Countdown</button>
      <button onClick={() => setRegistrationTimer(TIMER)}>Reset Countdown</button>
    </section>
  )
};

export default Registration;