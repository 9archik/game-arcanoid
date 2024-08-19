import { useState } from "react";
import styles from "./style.module.css";
import { IPickColor } from "./interface";
import { FC } from "react";
const CloseSVG = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M3 21.32L21 3.32001"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
        <path
          d="M3 3.32001L21 21.32"
          stroke="#000000"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};
const PickColor: FC<IPickColor> = ({ curColor, onChangeColor, closeClick }) => {
  const [colorVal, setColorVal] = useState(curColor);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={styles.container}
    >
      <div className={styles.header}>
        <span>Выбрать цвет заклинаний для игрока 1</span>
        <button onClick={closeClick}>
          <CloseSVG />
        </button>
      </div>

      <label>
        <input
          value={colorVal}
          onChange={(e) => {
            setColorVal(e.target.value);
            onChangeColor(e);
          }}
          type="color"
        />
        <span>{colorVal}</span>
      </label>
    </div>
  );
};

export default PickColor;
