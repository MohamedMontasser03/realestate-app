import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { SelectedType } from "./SelectedContext";

export type GridType = number[];

type ActionType = "add";

type ReducerType = (
  state: GridType,
  action: { type: ActionType; payload: SelectedType }
) => GridType;

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
        //  payload.num && (state[payload.num] = {col: payload.col, row: payload.row});
        return state;
      default:
        return state;
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

function GridProvider(props: { children?: ReactNode }) {
  const state = useReducer(GridReducer, []);

  return <GridContext.Provider value={state} {...props} />;
}

function useGrid() {
  const context = useContext(GridContext);
  if (!context) throw new Error("Not inside a grid provider");
  return context;
}

export { useGrid, GridProvider };
