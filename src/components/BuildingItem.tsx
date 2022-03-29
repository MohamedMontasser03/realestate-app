import React from 'react'

type BuildingItemProps = any;

function BuildingItem({building}: BuildingItemProps) {
  return (
    <div className="buildings__item">
        <img src={`images/buildings/asset${building}.png`} alt="building" />
        <div className="buildings__info">
            <span>Name:</span>
            <span className='price'>Price: 3000</span>
            <span className='income'>Income: 10</span>
        </div>
    </div>
  )
}

export default BuildingItem