import React, { useEffect, useRef, useState } from 'react'
import { useGrid } from '../context/GridContext';
import { useSelected } from '../context/SelectedContext';
import useMousePos from '../hooks/useMousePos';

function Canvas() {
  const crf = useRef<HTMLCanvasElement>(null);
  const {clicked, dx, dy, x, y} = useMousePos(crf);
  const [pos, setPos] = useState([0, 0]);
  const [grid] = useGrid();
  const [selected, setSelected] = useSelected();
  const colConst = 245, rowConst = 140;

  useEffect(() => {
    crf.current!.height = +crf.current!.clientHeight;
    crf.current!.width = +crf.current!.clientWidth;
  }, []);

  useEffect(() => {
    if(clicked){
      setPos(s => [s[0] + dx, s[1] + dy]);
    }
  }, [clicked, dx, dy]);

  //The Draw UseEffect
  useEffect(() => {
    const ctx = crf.current!.getContext("2d");

    const drawBuilding = (build:number, x:number, y:number) => {
      const img = document.createElement("img");
      img.src = `images/buildings/asset${build}.png`;
      ctx?.drawImage(img, pos[0]+x, pos[1]+y);
    }

    ctx?.clearRect(0, 0, 1000, 1000);
    Object.keys(grid).forEach((v) => drawBuilding(+v, rowConst*grid[v].row + colConst * grid[v].col, rowConst*grid[v].row))

    ////

    if(selected.num){
      const row = Math.floor((y-pos[1])/rowConst);
    const col = Math.floor((x-pos[0]-row*rowConst)/colConst);
    ctx?.save();
    const redFilter = "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)";

    const taken = Object.keys(grid).reduce((p,c) => p || (grid[c].col === col && grid[c].row === row), false)

    ctx!.filter = "opacity(0.6)" + (taken ? redFilter : "");
    drawBuilding(selected.num, rowConst*row + colConst * col, rowConst*row);
    setSelected({num: selected.num, col, row, taken});
    ctx?.restore();
    }

  }, [grid, pos, selected, x, y]);
  

  return <div><canvas ref={crf}/></div>
}

export default Canvas