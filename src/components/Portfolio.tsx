import React from 'react'
import PortfolioItem from './PortfolioItem'

function Portfolio() {
  return (
    <div className='portfolio'>
        <h2>ASSET PORTFOLIO</h2>
        <div className="assets">
            <PortfolioItem/>
        </div>
    </div>
  )
}

export default Portfolio