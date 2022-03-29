import React, { useEffect, useState } from 'react'

function useMousePos(ref: React.RefObject<HTMLElement>) {
    const [clicked, setClicked] = useState(false);
    const [pos, setPos] = useState([0, 0]);
    const [dPos, setDPos] = useState([0, 0]);
  useEffect(() => {
    const el = ref.current!;

    const onMouseDown = (e: MouseEvent) => {
        setClicked(true);
        
        setPos([e.clientX- el.offsetLeft, e.clientY- el.offsetTop]);
    }
    const onWindowMouseUp = (e: MouseEvent) => {
        setClicked(false);
    }
    const onMove = (e: MouseEvent)=>{

        setDPos([e.clientX - pos[0] - el.offsetLeft, e.clientY - pos[1] - el.offsetTop]);
        setPos([e.clientX- el.offsetLeft, e.clientY- el.offsetTop]);
    }
    
    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onWindowMouseUp);
    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onWindowMouseUp);
    }
  }, [pos, ref])
  
  return {clicked, x:pos[0], y:pos[1], dx:dPos[0], dy:dPos[1]}
}

export default useMousePos