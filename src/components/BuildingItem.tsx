import React, { useEffect, useRef, useState } from "react";
import { useGrid } from "../context/GridContext";
import { useSelected } from "../context/SelectedContext";
import useMousePos from "../hooks/useMousePos";

type BuildingItemProps = { building: number };

function BuildingItem({ building }: BuildingItemProps) {
  const imgRef = useRef(null);
  const { clicked } = useMousePos(imgRef);
  const [state, setState] = useState("");
  const [grid] = useGrid();
  const [selected, setSelected] = useSelected();

  useEffect(() => {
    const taken = grid.filter((b) => b === building - 1);
    if (taken.length > 0) {
      console.log("taken", grid, building);
      setState("gray");
      return;
    }

    if (state !== "gray") {
      if (clicked && state !== "active") {
        setState("active");
        setSelected((s) => ({ ...s, num: building }));
        document.body.style.cursor = "grabbing";
      } else if (!clicked && state === "active") {
        setState("");
        if (selected.taken) {
          setSelected((s) => ({ ...s, dropped: false, num: 0 }));
        } else {
          setSelected((s) => ({ ...s, dropped: s.num ? true : false }));
        }

        document.body.style.cursor = "default";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked, grid, state, selected]);

  return (
    <div className={`buildings__item ${state}`}>
      <img
        src={`images/icons/asset${building}.png`}
        ref={imgRef}
        alt="building"
      />
      <div className="buildings__info">
        <span>Name:</span>
        <span className="price">Price: 3000</span>
        <span className="income">Income: 10</span>
      </div>
    </div>
  );
}

export default BuildingItem;
