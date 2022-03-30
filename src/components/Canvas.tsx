import React, { useEffect, useRef, useState } from 'react'
import config from '../config/index'
import { GridType, useGrid } from '../context/GridContext';
import { useSelected } from '../context/SelectedContext';
import useMousePos from '../hooks/useMousePos';
import Modal from './Modal';

function Canvas() {
  const crf = useRef<HTMLCanvasElement>(null);
  const {clicked, dx, dy, x, y} = useMousePos(crf);
  const [pos, setPos] = useState([0, 0]);
  const [grid] = useGrid();
  const [selected, setSelected] = useSelected();
  const {rowConst, colConst} = config;

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

    const img = document.createElement("img");
    const drawBuilding = (build:number, x:number, y:number) => {
      img.src = `images/buildings/asset${build}.png`;
      ctx?.drawImage(img, pos[0]+x, pos[1]+y);

    }

    ctx?.clearRect(0, 0, crf.current!.clientWidth, crf.current!.clientWidth);


    // Object.keys(grid).forEach((v) => {
    //   ctx!.fillStyle = "#403f41";
    //   ctx?.fillRect(pos[0] + rowConst*grid[v].row + colConst * grid[v].col - 7, pos[1] + rowConst*grid[v].row,260,270)
    // })

    const preMap: GridType = {
      "28a": {col: -1, row:-1},
      "28b": {col: 0, row:-1},
      "28c": {col: 1, row:-1},
      "28d": {col: 2, row:-1},
      "28e": {col: 3, row:-1},
      "28aa": {col: -1, row:4},
      "28ba": {col: 0, row:4},
      "28ca": {col: 1, row:4},
      "28da": {col: 2, row:4},
      "28ea": {col: 3, row:4},
      "28ab": {col: -1, row:0},
      "28ac": {col: -1, row:1},
      "28ad": {col: -1, row:2},
      "28ae": {col: -1, row:3},
      "28bb": {col: 3, row:0},
      "28cc": {col: 3, row:1},
      "28dd": {col: 3, row:2},
      "28ee": {col: 3, row:3},
    }
    const map = {...grid, ...preMap};
    Object.keys(map).sort((a, b) => map[a].row - map[b].row).forEach((v) => drawBuilding(parseInt(v), rowConst*map[v].row + colConst * map[v].col, rowConst*map[v].row))

    ////

    if(selected.num && !selected.dropped){
      const row = Math.floor((y-pos[1])/rowConst);
    const col = Math.floor((x-pos[0]-row*rowConst)/colConst);
    ctx?.save();
    const redFilter = "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)";
    const taken = !((col<3 && col >= 0) && (row<4 && row >= 0)) || (Object.keys(grid).reduce<boolean>((p,c) => p || (grid[c].col === col && grid[c].row === row), false));
    console.log(!((col<3 && col >= 0) && (row<4 && row >= 0)), taken)

    ctx!.filter = "opacity(0.6)" + (taken ? redFilter : "");
    drawBuilding(selected.num, rowConst*row + colConst * col, rowConst*row);
    setSelected({num: selected.num, col, row, taken, dropped: selected.dropped});
    ctx?.restore();
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, pos, selected, x, y]);
  

  return <div className={`canv ${selected.dropped && selected.num ? "canvmodal":""}`}>{selected.dropped && selected.num ? <Modal/> : <></>}<canvas ref={crf}/></div>
}

export default Canvas