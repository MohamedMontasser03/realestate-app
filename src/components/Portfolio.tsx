import React from "react";
import { useGrid } from "../context/GridContext";
import PortfolioItem from "./PortfolioItem";

function Portfolio() {
  const [grid] = useGrid();

  return (
    <div className="portfolio">
      <h2>ASSET PORTFOLIO</h2>
      <div className="assets scrl">
        {grid.map((b) =>
          b !== -1 ? <PortfolioItem key={b} building={b + 1} /> : <></>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
