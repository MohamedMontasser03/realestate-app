import React from 'react'
import { useGrid } from '../context/GridContext';
import { useSelected } from '../context/SelectedContext';

function Modal() {
  const [, dispatchGrid] = useGrid();
  const [selected, setSelected] = useSelected();

  return (
    <div className='modal'>
        <p>Confirm purchase</p>
        <div className="building">
            <img src={`images/buildings/asset${selected.num}.png`} alt="building" />
            <div className="buildings__info">
                <span>Name:</span>
                <span className='price'>Price: 3000</span>
                <span className='income'>Income: 10</span>
            </div>
        </div>
            <div className="buttons">
                <button onClick={() => {dispatchGrid({type:'add', payload: selected}); setSelected({...selected, dropped: false, num: 0})}}>CONFIRM</button>
                <button onClick={() => setSelected({...selected, dropped: false, num: 0})}>CANCEL</button>
            </div>
    </div>
  )
}

export default Modal