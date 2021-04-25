import React, {createContext, useReducer} from 'react';

const initialState = {
  fileName: '',
  chemicals: {},
  locations: {},
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    const {type, value} = action;
    return {
      ...state,
      [type]: value
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }