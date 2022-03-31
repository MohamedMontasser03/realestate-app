import React from 'react'
import config from '../config/index'
import BuildingItem from './BuildingItem'

function Buldings() {
  return (
    <div className='buildings'>
        <h2>REAL ESTATE AVAILABLE FOR PURCHASE</h2>
        <div className="buildings__list scrl">
            {
              new Array(config.noOfTile).fill(0).map((_, i)=><BuildingItem key={i+1} building={i+1}/>)
            }
        </div>
    </div>
  )
}

export default Buldings