// CREATING THE STORE WITH REDUCER LAYER

import { createStore } from 'redux';
import classroomReducer from './ClassroomReducer';

const store = createStore(
  // 1st arg: Reducer
  classroomReducer,
  // 2nd arg: middleware/enhancers
  {}
);

export default store;