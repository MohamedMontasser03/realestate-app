import React from 'react'

function BuildingItem() {
  return (
    <div className="buildings__item">
        <img src="images/buildings/001.webp" alt="building" />
        <div className="buildings__info">
            <span>Name:</span>
            <span className='price'>Price: 3000</span>
            <span className='income'>Income: 10</span>
        </div>
    </div>
  )
}

export default BuildingItem