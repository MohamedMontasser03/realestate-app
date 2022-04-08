import React, { useEffect, useRef, useState } from 'react'
import config from '../config/index'
import { GridType, useGrid } from '../context/GridContext';
import { useSelected } from '../context/SelectedContext';
import useMousePos from '../hooks/useMousePos';
import reqAnimation from '../utils/reqAnimation';
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

  //The Grap UseEffect
  useEffect(() => {
    const a = colConst, b = rowConst, c = colConst - 97, d = rowConst+86, eps=0.5;

    if(selected.num && !selected.dropped){
      const row = Math.floor(((y-pos[1])*a+c*(x-pos[0]))/(a*b+c*d)-eps);
      const col = Math.floor((-(y-pos[1])*d+b*(x-pos[0]))/(a*b+c*d)+eps);

      const taken = !((col<3 && col >= 0) && (row<4 && row >= 0)) || (Object.keys(grid).reduce<boolean>((p,c) => p || (grid[c].col === col && grid[c].row === row), false));
      setSelected({num: selected.num, col, row, taken, dropped: selected.dropped});
      }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pos, x, y]);

  //The Draw UseEffect
  useEffect(() => {
    const ctx = crf.current!.getContext("2d");
    const a = colConst, b = rowConst, c = colConst - 97, d = rowConst+86;
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

    
    const drawBuilding = (build:number, x:number, y:number) => {const img = new Image();
      img.src = `images/buildings/asset${build}.png`;
      setPos((v) => {
        ctx?.drawImage(img, v[0]+x, v[1]+y);
        return v;
      })
    }

    reqAnimation(() => {
      ctx?.clearRect(0, 0, crf.current!.clientWidth, crf.current!.clientWidth);

      for(let i = 0; i<4; i++){
        for(let j = 0; j<3; j++){
          drawBuilding(0, d*i + a * j, b*i - c * j);
        }
      }
  
      const map = {...grid, ...preMap};
      Object.keys(map).sort((a, b) => {
        if(map[a].row - map[b].row === 0)
          return map[b].col - map[a].col;
        return map[a].row - map[b].row;
      })
      .forEach((v) => drawBuilding(parseInt(v), d*map[v].row + a * map[v].col, b*map[v].row - c * map[v].col))

      setSelected((v) => {
        if(v.num && !v.dropped){
            
          ctx?.save();
          const redFilter = "grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)";
          
          ctx!.filter = "opacity(0.6) " + (v.taken ? redFilter : "");
          drawBuilding(v.num, d*v.row + a * v.col, b*v.row - c * v.col);
          ctx?.restore();
          }
        return v;
      })
      
    }, 1000/60);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return <div className={`canv ${selected.dropped && selected.num ? "canvmodal":""}`}>{selected.dropped && selected.num ? <Modal/> : <></>}<canvas ref={crf}/></div>
}

export default Canvas