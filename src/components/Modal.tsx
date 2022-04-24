import React from "react";
import { useGrid } from "../context/GridContext";

type Active = {
  building: number;
  x: number;
  y: number;
  slot: number;
};

type ModalProps = {
  activeState: [Active, React.Dispatch<React.SetStateAction<Active>>];
  modalState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
};

function Modal({ activeState, modalState }: ModalProps) {
  const [active, setActive] = activeState;
  const [modal, setModal] = modalState;
  const [, dispatchGrid] = useGrid();

  const onConfirm = () => {
    dispatchGrid({ type: "add", payload: [active.slot, active.building] });
    setActive({
      building: 0,
      x: -200,
      y: -200,
      slot: -1,
    });
    setModal(false);
  };

  const onCancel = () => {
    setActive({
      building: 0,
      x: -200,
      y: -200,
      slot: -1,
    });
    setModal(false);
  };

  return modal ? (
    <div className="modal">
      <p>Confirm purchase</p>
      <div className="building">
        <img
          src={`images/icons/asset${active.building + 1}.png`}
          alt="building"
        />
        <div className="buildings__info">
          <span>Name:</span>
          <span className="price">Price: 3000</span>
          <span className="income">Income: 10</span>
        </div>
      </div>
      <div className="buttons">
        <button onClick={onConfirm}>CONFIRM</button>
        <button onClick={onCancel}>CANCEL</button>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default Modal;
