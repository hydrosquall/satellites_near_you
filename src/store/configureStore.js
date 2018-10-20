import { createStore, applyMiddleware } from "redux";
import todoApp from "./reducers";

// Production versions of our local middleware
import thunk from "redux-thunk";
import createLogger from "redux-logger";

// lets you express async action creators which involve multiple actions.
// if it's not a function, it'll just go on to the next middleware.
// const thunk = store => next => action => {
//   typeof action === "function"
//     ? action(store.dispatch, store.getState) // grant access to state if needed
//     : next(action);
// };

const configureStore = () => {
  const middlewares = [thunk];

  // Only instrument in dev environment
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger);
  }

  const store = createStore(
    todoApp,
    // persistedState would go in middle,
    //enhancers go last
    applyMiddleware(...middlewares)
  );

  return store;
};

export default configureStore;
