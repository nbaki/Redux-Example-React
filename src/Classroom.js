import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClassroomList from './ClassroomList';
import Students from './Students';
import { saveNewClassroomSubject, getClassroomOptions } from './redux/ClassroomActions';
import { Form, FormGroup, Alert, Input, InputGroup, Button, Card, CardBody, CardHeader, CardText, CardTitle, Table, Spinner } from 'reactstrap';

// useState is a hook function that allows us to "hook" into React lifecycle and state logic
// useState takes an argument -> default value of your state data

// React renders our function first time
// Classroom();
// State changes
// React renders again
// Classroom();

function Classroom(props) {
  const [subject, setSubject] = useState('Default Subject'); // returns [data, functionToSetData]
  const [userEntry, setUserEntry] = useState('');
  const [message, setMessage] = useState();

  const registeredClasses = useSelector(state => state.registeredClasses); // selects the "registeredClasses" property out of the redux state object
  const loading = useSelector(state => state.isLoading);
  const alert = useSelector(state => ({type: state.alertType, message: state.alertMessage}));
  const classroomOptions = useSelector(state => state.classroomOptions);

  const dispatch = useDispatch();
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
    // console.log('Button clicking');
    // console.log('Im about add the subject', userEntry);

    // setMessage('You have successfully added a subject');
    setSubject(userEntry); // subject = userEntry
    dispatch(saveNewClassroomSubject(userEntry));
  }

  const handleInput = (event) => {
    let userInput = event.target.value;
    // console.log('The subject is', userInput);
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

  const showRegisteredClasses = () => {
    if (registeredClasses.length) {
      return registeredClasses.map(classroom => <ClassroomList key={classroom.class} classroom={classroom} />);
    } else {
      return <tr><td>No classrooms have been registered yet</td><td /></tr>
    }
  }

  useEffect(() => {
    dispatch(getClassroomOptions());
  }, [])

  return (
    <Card>
      <CardHeader tag="h2">
        Add New Classroom Subject
      </CardHeader>
      <CardBody>
        <section id="classroom-form">
          {loading && <Spinner />}
          {/* <h2>{props.myData}</h2> */}
          {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}
          <Form>
            <FormGroup>
              <InputGroup>
                <Input placeholder="Enter Subject" onKeyUp={handleInput} />
                <Button color="success" onClick={handleButton}>Add</Button>
              </InputGroup>
            </FormGroup>
          </Form>
          {/* <input type="text" placeholder="enter subject" onKeyUp={handleInput} />
          <button onClick={handleButton}>Add</button> */}
        </section>
        <section id="subjects" className="mt-5">
          <CardTitle tag="h3">
            Classroom Subjects
          </CardTitle>
          <CardText>{classroomOptions.map(option => <p>{option.subject}</p>)}</CardText>
        </section>
        <section id="registered-class-list" className="mt-5">
          <h3>Registered Classes</h3>
          <Table hover striped>
            <thead>
              <tr>
                <th>Classroom Title</th>
                <th>Registrant Name</th>
              </tr>
            </thead>
            <tbody>
              {showRegisteredClasses()}
            </tbody>
          </Table>
          
          {/* Show my registered classes */}
          {/* <p>Classroom Subject: {registeredClasses.class}</p>
          <p>Registrant Name: {registeredClasses.name}</p> */}
        </section>
      </CardBody>
      
      {/* <Students numOfStudents={props.numOfStudents} /> */}
    </Card>
  );
};

export default Classroom;