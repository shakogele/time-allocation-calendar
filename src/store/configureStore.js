import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import logger from "redux-logger";

import uiReducer from "./reducers/ui";
import calendarReducer from "./reducers/calendar";

const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
});

let composeEnhancers = compose;
const middlewares = [thunk];

if(process.env.NODE_ENV === 'development'){
  middlewares.push(logger);
}else {
  // Remove All Console Log Statements from production:)
  console.log = function() {}
}

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;