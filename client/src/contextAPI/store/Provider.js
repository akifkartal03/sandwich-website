import React, { createContext, useReducer,useContext } from "react";

const StateContext = createContext();
export function StateProvider({ children,reducer,initialValue }) {
  return <StateContext.Provider value={useReducer(reducer,initialValue)}>{children}</StateContext.Provider>;
}
export function useStore(){
    return useContext(StateContext);

}