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
  registeredClasses: []
}

const classroomReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'REGISTER_CLASS':
      return { ...state, registeredClasses: [...state.registeredClasses, action.addedClass] };
    default:
      return initialState; // {} redux provides empty to start with
  }
};

export default classroomReducer;