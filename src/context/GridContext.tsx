import React, {
    createContext,
    ReactNode,
    useContext,
    useReducer,
  } from "react";
import { SelectedType } from "./SelectedContext";
  
  type GridType = {
    [key:string]: {col: number, row: number};
  }

  type ActionType = "add";
  
  type ReducerType = (
    state: GridType,
    action: { type: ActionType; payload: SelectedType }
  ) => {};
  
  const GridContext = createContext(
    {} as [
      GridType,
      React.Dispatch<{
        type: ActionType;
        payload: SelectedType;
      }>
    ]
  );
  
  const GridReducer: ReducerType = (state, { type, payload }) => {
    try {
      switch (type) {
        case "add":
           payload.num && (state[payload.num] = {col: payload.col, row: payload.row});
           return state;
        default:
          return state;
      }
    } catch (err: any) {
      return "Invalid Input";
    }
  };
  
  function GridProvider(props: { children?: ReactNode }) {
    const state = useReducer(GridReducer, {"2": {col: 0, row: 0}, "1": {col: 1, row: 1},"4": {col: 1, row: 0}});
  
    return <GridContext.Provider value={state} {...props} />;
  }
  
  function useGrid() {
    const context = useContext(GridContext);
    if (!context) throw new Error("Not inside a grid provider");
    return context;
  }
  
  export { useGrid, GridProvider };