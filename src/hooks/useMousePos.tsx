import React, { useEffect, useState } from 'react'

function useMousePos(ref: React.RefObject<HTMLElement>) {
    const [clicked, setClicked] = useState(false);
    const [pos, setPos] = useState([0, 0]);
    const [dPos, setDPos] = useState([0, 0]);
  useEffect(() => {
    const el = ref.current!;

    const onMouseDown = (e: MouseEvent) => {
        setClicked(true);

        const rect = el.getBoundingClientRect();
        setPos([e.clientX- rect.left, e.clientY- rect.top]);
    }
    const onWindowMouseUp = (e: MouseEvent) => {
        setClicked(false);
    }
    const onMove = (e: MouseEvent)=>{
      const rect = el.getBoundingClientRect();

        setDPos([e.clientX - pos[0] - rect.left, e.clientY - pos[1] - rect.top ]);
        setPos([e.clientX- rect.left, e.clientY- rect.top]);
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