import { FC } from "react";
import styles from "./style.module.css";
import { ISettingsProps } from "./interface";
import { HEROSTARTPARAMS } from "../../constants/gameParams";
const Settings: FC<ISettingsProps> = ({
  onChangeShotSpeedP1,
  onChangeShotSpeedP2,
  onChangeSpeedMoveP1,
  onChangeSpeedMoveP2,
  shotSpeedP1,
  shotSpeedP2,
  speedP1,
  speedP2,
}) => {
  return (
    <div className={styles.container}>
      <label>
        <span>Скорость передвижения 1го игрока</span>
        <input
          value={speedP1}
          onChange={onChangeSpeedMoveP1}
          type="range"
          min={1}
          max={5}
        />
      </label>

      <label>
        <span>Интервал между выстрелами игрока 1</span>
        <input
          value={shotSpeedP1}
          onChange={onChangeShotSpeedP1}
          type="range"
          min={1}
          max={5}
        />
      </label>

      <label>
        <span>Скорость передвижения 2го игрока</span>
        <input
          value={speedP2}
          onChange={onChangeSpeedMoveP2}
          type="range"
          min={1}
          max={5}
        />
      </label>

      <label>
        <span>Интервал между выстрелами игрока 2</span>
        <input
          value={shotSpeedP2}
          onChange={onChangeShotSpeedP2}
          type="range"
          min={1}
          max={5}
        />
      </label>
    </div>
  );
};

export default Settings;
