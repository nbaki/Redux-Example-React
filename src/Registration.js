import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerClass, getClassroomOptions } from './redux/ClassroomActions';
import { Form, Spinner, FormGroup, Label, Input, Alert, Button, Card, CardBody, CardHeader, CardTitle, ButtonGroup } from 'reactstrap';

const TIMER = 60;

function Registration(props) {
  const [registrationTimer, setRegistrationTimer] = useState(TIMER);
  const intervalCallback = () => {
    setRegistrationTimer(timer => timer - 1); // subtract 1 every second
  };
  const [timerInterval, setTimerInterval] = useState();
  const [registrationData, setRegistrationData] = useState({});
  const [registerMessage, setRegisterMessage] = useState();

  const dispatch = useDispatch(); // returns a dispatcher function
  const loading = useSelector(state => state.isLoading);
  const classroomOptions = useSelector(state => state.classroomOptions);
  // console.log('loading is', loading);

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

  // Run this side effect anytime 'registrationTimer' changes
  useEffect(() => {
    if (registrationTimer === 0) {
      // remove the interval
      clearInterval(timerInterval);
      setTimerInterval(0);
    } else if (registrationTimer === TIMER && timerInterval === 0) {
      setTimerInterval(setInterval(intervalCallback, 1000)) // ms
    }
  }, [registrationTimer]);

  // this side effect runs during every single re-render
  // useEffect(() => {
  //   console.log('rerendering');
  // });

  useEffect(() => {
    // setTimeout() = Runs some code after some time elapses
    dispatch(getClassroomOptions()); // go get classroom data

    setTimerInterval(setInterval(intervalCallback, 1000)) // ms

    // Cleanup when component unmounts
    return () => {
      clearInterval(timerInterval);
    }
  }, []); // Empty array [] is equivalent to running the side effect of the first component render

  // setRegistrationTimer(40); setRegistrationTimer(data => data - 20);
  /*
    1. Allow user to register for a class within timer window
    2. If they "register" within timer, output what they entered
    3. If timer elapses, stop user from registering
      -- Clear the HTML
  */

  const handleSubmit = () => {
    // console.log(registrationData);
    setRegisterMessage('You have successfully registered for this class');

    // Trigger an action in redux
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

  const displayClassroomOptions = () => {
    if (classroomOptions.length) {
      return classroomOptions.map(classroom => {
        return <option key={classroom.id} value={classroom.id}>{classroom.subject}</option>
      })
    }
  }

  console.log('classroom options are', classroomOptions);

  return (
    <Card>
      <CardHeader tag="h2">
        Welcome! Please register for your class.
      </CardHeader>
      <CardBody>
        <CardTitle tag="h3" className="text-center">
          You have {registrationTimer} seconds to register.
        </CardTitle>
        {loading && <Spinner />}

        {registerMessage && <Alert toggle={() => setRegisterMessage(null)} color="success">{registerMessage}</Alert>}
        {/* Conditional Rendering */}
        {registrationTimer > 0 && <Form>
          <FormGroup>
            <Label for="subject">
              Subject
            </Label>
            <Input type="select" id="subject" onChange={handleClassSelection}>
              <option>-- Select a class --</option>
              {displayClassroomOptions()}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="registrant-name">Registrant Name</Label>
            <Input onKeyUp={handleName} />
          </FormGroup>
          <Button color="success" onClick={handleSubmit}>Register</Button>
        </Form>}
      </CardBody>
      <ButtonGroup>
        <Button color="primary" onClick={() => setRegistrationTimer(data => data - 1)}>Manual Countdown</Button>
        <Button color="info" onClick={() => setRegistrationTimer(TIMER)}>Reset Countdown</Button>
      </ButtonGroup>
    </Card>
  )
};

export default Registration;