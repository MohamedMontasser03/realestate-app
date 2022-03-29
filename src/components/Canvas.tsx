import React, { useEffect, useRef, useState } from 'react'
import useMousePos from '../hooks/useMousePos';

function Canvas() {
  const crf = useRef<HTMLCanvasElement>(null);
  const {clicked, dx, dy} = useMousePos(crf);
  const [pos, setPos] = useState([0, 0]);

  useEffect(() => {
    crf.current!.height = +crf.current!.clientHeight;
    crf.current!.width = +crf.current!.clientWidth;
  }, []);

  useEffect(() => {
    const ctx = crf.current!.getContext("2d");
    
    if(clicked){
      setPos([pos[0] + dx, pos[1] + dy]);
    }
    


    ctx?.clearRect(0, 0, 1000, 1000);
    // ctx?.transform(1, 0, 0, 1, pos[0], pos[1]);
    const img = document.createElement("img");
    img.src = "images/buildings/asset1.png";
    ctx?.drawImage(img, pos[0], pos[1]);
  }, [clicked, dx, dy]);
  

  return <div><canvas ref={crf}/></div>
}

export default Canvas