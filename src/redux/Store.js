// CREATING THE STORE WITH REDUCER LAYER

import { createStore, applyMiddleware } from 'redux';
import classroomReducer from './ClassroomReducer';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';

/*
  Action -> [Dispatch -> Middleware -> Reducer -> State] -> View
  [] = "store"
*/

/*
  Thunk:
    1. Allows us to return a function, instead of an object, 
       for our dispatcher
    2. Inject async functionality
*/

const store = createStore(
  // 1st arg: Reducer
  classroomReducer,
  // 2nd arg: middleware/enhancers
  applyMiddleware(thunk)
);

export default store;