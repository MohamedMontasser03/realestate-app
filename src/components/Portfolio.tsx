import React from 'react'
import { useGrid } from '../context/GridContext';
import { useSelected } from '../context/SelectedContext';
import PortfolioItem from './PortfolioItem';

function Portfolio() {
  const [grid] = useGrid();
  const [selected] = useSelected();
  

  return (
    <div className='portfolio'>
        <h2>ASSET PORTFOLIO</h2>
        <div className="assets scrl">
          {selected&&Object.keys(grid).map(v => <PortfolioItem key={v} building={+v}/>)}
        </div>
    </div>
  )
}

export default Portfolio