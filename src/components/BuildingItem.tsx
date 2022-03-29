import React, { useEffect, useRef, useState } from 'react'
import { useGrid } from '../context/GridContext';
import { useSelected } from '../context/SelectedContext';
import useMousePos from '../hooks/useMousePos';

type BuildingItemProps = {building: number};

function BuildingItem({building}: BuildingItemProps) {
  const imgRef = useRef(null);
  const {clicked, x, y} = useMousePos(imgRef);
  const [state, setState] = useState("");
  const [grid, dispatchGrid] = useGrid();
  const [selected, setSelected] = useSelected();

useEffect(() => {
  
  if(grid[building] !== undefined){
    setState("gray");
    return;
  }

  if( state !== "gray"){
  if(clicked){
    setState("active"); 
    setSelected((s) => ({...s, num: building}));
    document.body.style.cursor = "grabbing";
  }else{
    setState("");
    if(!selected.taken){
      dispatchGrid({type:'add', payload: selected})
    }
    setSelected((s) => ({...s, num: 0}));

    document.body.style.cursor = "default";
  }
}
}, [building, clicked, grid, state])


  return (
    <div className={`buildings__item ${state}`}>
        <img src={`images/buildings/asset${building}.png`} ref={imgRef} alt="building" />
        <div className="buildings__info">
            <span>Name:</span>
            <span className='price'>Price: 3000</span>
            <span className='income'>Income: 10</span>
        </div>
    </div>
  )
}

export default BuildingItem