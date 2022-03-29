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
    if(clicked){
      setPos(s => [s[0] + dx, s[1] + dy]);
    }
  }, [clicked, dx, dy]);

  useEffect(() => {
    const ctx = crf.current!.getContext("2d");

    ctx?.clearRect(0, 0, 1000, 1000);
    // ctx?.transform(1, 0, 0, 1, pos[0], pos[1]);
    const img = document.createElement("img");
    img.src = "images/buildings/asset1.png";
    ctx?.drawImage(img, pos[0], pos[1]);
  }, [pos]);
  

  return <div><canvas ref={crf}/></div>
}

export default Canvas