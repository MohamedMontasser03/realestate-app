import React from "react";

type PortfolioItemProps = { building: number };

function PortfolioItem({ building }: PortfolioItemProps) {
  return (
    <div className="port__item">
      <img
        src="https://www.svgrepo.com/show/362151/sign-check.svg"
        alt="Check"
        className="check"
      />
      <img src={`images/buildings/asset${building}.png`} alt="Building" />
      <div className="info">
        <span>Name</span>
        <hr />
        <div className="choice">
          <div className="income-choice">
            <button className="income">Claim Income</button>
            <span>0.0000</span>
          </div>
          <hr className="vr" />
          <div className="maintain-choice">
            <span>Maintainance Fee Due in 100 Days</span>
            <button className="maintain">PAY</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioItem;
