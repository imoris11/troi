import React, { createContext, useReducer } from 'react'

export const TimePeriod = {
  ALL: 'all',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  DAILY: 'daily',
}

const initialState = {
  fileName: '',
  chemicals: {},
  locations: {},
  timePeriod: TimePeriod.ALL,
  range: {
    min: null,
    max: null,
  },
  selectedChemical: '',
}

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    const { type, value } = action
    return {
      ...state,
      [type]: value,
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
