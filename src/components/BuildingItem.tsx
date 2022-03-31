import React, { useEffect, useRef, useState } from 'react'
import { GridType, useGrid } from '../context/GridContext';
import { useSelected } from '../context/SelectedContext';
import useMousePos from '../hooks/useMousePos';

type BuildingItemProps = {building: number};
const preMap: GridType = {
  "28": {col: -1, row:-1},
  "34": {col: 0, row:-1},
  "37": {col: 1, row:-1},
  "26": {col: 2, row:-1},
  "30": {col: 3, row:-1},
  "10": {col: -1, row:4},
  "40": {col: 0, row:4},
  "22": {col: 1, row:4},
  "11": {col: 2, row:4},
  "19": {col: 3, row:4},
  "17": {col: -1, row:0},
  "35": {col: -1, row:1},
  "24": {col: -1, row:2},
  "20": {col: -1, row:3},
  "29": {col: 3, row:0},
  "14": {col: 3, row:1},
  "38": {col: 3, row:2},
  "7": {col: 3, row:3},
}

function BuildingItem({building}: BuildingItemProps) {
  const imgRef = useRef(null);
  const {clicked} = useMousePos(imgRef);
  const [state, setState] = useState("");
  const [grid] = useGrid();
  const [selected, setSelected] = useSelected();

useEffect(() => {

  if(grid[building] !== undefined || preMap[building] !== undefined){
    setState("gray");
    return;
  }

  if( state !== "gray"){
  if(clicked && state !== "active"){
    setState("active"); 
    setSelected((s) => ({...s, num: building}));
    document.body.style.cursor = "grabbing";
  }else if(!clicked && state === "active"){
    setState("");
    if(selected.taken){
      setSelected((s) => ({...s, dropped: false, num: 0}));
    }else{
      setSelected((s) => ({...s, dropped: s.num ? true:false}));
    }

    document.body.style.cursor = "default";
  }
}
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [clicked, grid, state, selected])


  return (
    <div className={`buildings__item ${state}`}>
        <img src={`images/icons/asset${building}.png`} ref={imgRef} alt="building" />
        <div className="buildings__info">
            <span>Name:</span>
            <span className='price'>Price: 3000</span>
            <span className='income'>Income: 10</span>
        </div>
    </div>
  )
}

export default BuildingItem