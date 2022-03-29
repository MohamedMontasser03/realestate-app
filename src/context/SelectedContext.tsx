import React, {
    createContext,
    ReactNode,
    useContext,
    useState,
  } from "react";
  
  export type SelectedType = {
    num: number;
    row: number;
    col: number;
    taken: boolean;
};

  type ContextType = [SelectedType, React.Dispatch<React.SetStateAction<SelectedType>>];
  
  const SelectedContext = createContext({} as ContextType);
  
  function SelectedProvider(props: { children?: ReactNode }) {
    const state = useState({num: 0, row: 0, col: 0, taken: false});
  
    return <SelectedContext.Provider value={state} {...props} />;
  }
  
  function useSelected() {
    const context = useContext(SelectedContext);
    if (!context) throw new Error("Not inside an Selected provider");
    return context;
  }
  
  export { useSelected, SelectedProvider };