import React from "react";
import "./style.css";

type PropType = {
  buttonId: number;
  buttonText: string;
  action: (param1: any) => void;
};

const ButtonEffect = ({ buttonId, buttonText, action }: PropType) => {
  return (
    <>
      {buttonId === 1 && (
        <button className="button button--piyo" onClick={action}>
          <div className="button__wrapper">
            <span className="button__text">{buttonText}</span>
          </div>
          <div className="characterBox">
            <div className="character wakeup">
              <div className="character__face" />
            </div>
            <div className="character wakeup">
              <div className="character__face" />
            </div>
            <div className="character">
              <div className="character__face" />
            </div>
          </div>
        </button>
      )}

      {buttonId === 2 && (
        <button className="button button--hoo" onClick={action}>
          <div className="button__wrapper">
            <span className="button__text">{buttonText}</span>
          </div>
          <div className="characterBox">
            <div className="character wakeup">
              <div className="character__face" />
              <div className="charactor__face2" />
              <div className="charactor__body" />
            </div>
            <div className="character wakeup">
              <div className="character__face" />
              <div className="charactor__face2" />
              <div className="charactor__body" />
            </div>
            <div className="character">
              <div className="character__face" />
              <div className="charactor__face2" />
              <div className="charactor__body" />
            </div>
          </div>
        </button>
      )}

      {buttonId === 3 && (
        <button className="button button--pen" onClick={action}>
          <div className="button__wrapper">
            <span className="button__text">{buttonText}</span>
          </div>
          <div className="characterBox">
            <div className="character wakeup">
              <div className="character__face" />
              <div className="charactor__face2" />
            </div>
            <div className="character wakeup">
              <div className="character__face" />
              <div className="charactor__face2" />
            </div>
            <div className="character">
              <div className="character__face" />
              <div className="charactor__face2" />
            </div>
          </div>
        </button>
      )}

      {buttonId === 4 && <div className="cursor-box cell">{buttonText}</div>}
    </>
  );
};

export default ButtonEffect;
