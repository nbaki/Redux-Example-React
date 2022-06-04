// REDUCER + STATE LAYER

/*
  Arguments:
    1: State of redux -- current state
    2: Action the dispatcher sent
      - Object of information
        - Has to have a property to identify the object
        - Optionally: Any additional payload information
*/

const initialState = {
  registeredClasses: [],
  isLoading: false,
  classroomOptions: [],
  alertMessage: '',
  alertType: ''
}

const classroomReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTER_CLASS':
      return { ...state, registeredClasses: [...state.registeredClasses, action.addedClass] };
    case 'LOAD_CLASSROOMS':
      return { ...state, isLoading: true };
    case 'SAVE_CLASSROOMS':
      return { ...state, isLoading: false, classroomOptions: action.classroomOptions };
    case 'SHOW_ALERT':
      return { ...state, isLoading: false, alertMessage: action.message, alertType: action.alertType };
    default:
      return initialState; // {} redux provides empty to start with
  }
};

export default classroomReducer;