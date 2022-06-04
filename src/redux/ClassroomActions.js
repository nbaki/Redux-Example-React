// ACTION LAYER
// At minimum, we should have an identifier property (i.e. type)

export const registerClass = (classroom) => {
  return {
    type: 'REGISTER_CLASS',
    addedClass: classroom
  }
}

const showLoading = () => {
  return {
    type: 'LOAD_CLASSROOMS'
  }
}

const saveClassroomOptions = (classrooms) => {
  console.log('Saving classrooms');
  return {
    type: 'SAVE_CLASSROOMS',
    classroomOptions: classrooms
  }
}

const displayAlert = (message, type) => {
  console.log('displaying alert', message);
  return {
    type: 'SHOW_ALERT',
    message: message,
    alertType: type
  }
}

export const saveNewClassroomSubject = (newSubject) => dispatch => {
  dispatch(showLoading());

  console.log('saving subject', newSubject);
  return fetch('http://localhost:3001/classrooms', {
    method: 'POST',
    body: JSON.stringify({subject: newSubject}),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(function(response) {
      console.log('response is', response);
      if (response.ok) { // ok = 200-299 codes
        return response; // another promise
      } else {
        throw new Error('Failed to save classroom');
      }
    })
    .then(function(response) {
      console.log('Next step in response', response);
      // successfully saved classrooms
      dispatch(displayAlert('Classroom subject added successfully', 'success'));
      dispatch(getClassroomOptions());
    })
    .catch(function(error) {
      dispatch(displayAlert('Failed to add classroom subject', 'error'));
    })
}

export const getClassroomOptions = () => dispatch => {
  // dispatch = dispatcher function object
  dispatch(showLoading());
  // go fetch data for all the classroom selections
  return fetch('http://localhost:3001/classrooms')
    .then(function(response) {
      // 1st step, let's check the response success
      console.log('response is', response);
      if (response.ok) { // ok = 200-299 codes
        return response; // another promise
      } else {
        throw new Error('Failed to fetch');
      }
    }).then(function(result) {
      console.log("Result is", result);
      // raw data that comes back from the response
      return result.json(); // returns another promise
    }).then(function(classrooms) {
      // formatted classrooms data
      console.log("Classrooms are", classrooms);
      dispatch(saveClassroomOptions(classrooms))
    })
    .catch(function(error) {
      console.log("Error is", error);
    })
}