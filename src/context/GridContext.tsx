import React, { createContext, ReactNode, useContext, useReducer } from "react";
import config from "../config";

export type GridType = number[];

type ActionType = "add";

type ReducerType = (
  state: GridType,
  action: { type: ActionType; payload: number[] }
) => GridType;

const GridContext = createContext(
  {} as [
    GridType,
    React.Dispatch<{
      type: ActionType;
      payload: number[];
    }>
  ]
);

const GridReducer: ReducerType = (state, { type, payload }) => {
  try {
    switch (type) {
      case "add":
        const [slot, building] = payload;
        return state.map((item, index) => {
          if (index === slot) {
            return building;
          }
          return item;
        });
      default:
        return state;
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

function GridProvider(props: { children?: ReactNode }) {
  const state = useReducer(
    GridReducer,
    new Array(config.slots.length).fill(-1)
  );

  return <GridContext.Provider value={state} {...props} />;
}

function useGrid() {
  const context = useContext(GridContext);
  if (!context) throw new Error("Not inside a grid provider");
  return context;
}

export { useGrid, GridProvider };
