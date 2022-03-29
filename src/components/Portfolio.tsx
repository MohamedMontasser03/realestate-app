import React from 'react'
import { useGrid } from '../context/GridContext';
import PortfolioItem from './PortfolioItem';

function Portfolio() {
  const [grid] = useGrid();

  return (
    <div className='portfolio'>
        <h2>ASSET PORTFOLIO</h2>
        <div className="assets scrl">
          {Object.keys(grid).map(v => <PortfolioItem key={v} building={+v}/>)}
        </div>
    </div>
  )
}

export default Portfolio