import React, { useEffect, useState } from "react";
import { useGrid } from "../context/GridContext";

type BuildingItemProps = { building: number };

function BuildingItem({ building }: BuildingItemProps) {
  const [grid] = useGrid();
  const [state, setState] = useState<"available" | "taken" | "active">(
    "available"
  );

  useEffect(() => {
    const taken = grid.filter((b) => b === building - 1);
    if (taken.length > 0) {
      setState("taken");
    }
  }, [building, grid, state]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (state === "available") {
      e.dataTransfer.setData(
        `building-${building - 1}`,
        (building - 1).toString()
      );
      // remove ghost image
      e.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
      setState("active");
    } else {
      e.preventDefault();
    }
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (state === "active") {
      setState("available");
    }
  };

  return (
    <div
      className={`buildings__item ${state}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <img src={`images/icons/asset${building}.png`} alt="building" />
      <div className="buildings__info">
        <span>Name:</span>
        <span className="price">Price: 3000</span>
        <span className="income">Income: 10</span>
      </div>
    </div>
  );
}

export default BuildingItem;
