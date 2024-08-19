import React, {
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import "./App.css";
import {
  canvasInit,
  drawHeroSpellList,
  drawSpell,
} from "./functions/drawFunctions/drawFunctions";
import { drawHero } from "./functions/drawFunctions/drawFunctions";
import { IHero } from "./interface";
import { GAMEPARAMS, HEROSTARTPARAMS } from "./constants/gameParams";
import { checkHoverHero, handleMouse } from "./functions/mouseFunctions";
import { Color } from "./constants/colors";
import {
  calcHeroMoveParams,
  calculateSpellsMove,
  heroSpellsGenerate,
} from "./functions/calculateGame/calculateGame";
import { useInterval } from "./hooks/useInterval";
import { IMouseCoordinates } from "./interface";
import { frameFunction } from "./functions/shared/frameFunction";
import Settings from "./components/Settings/Settings";
import Modal from "./components/Modal/Modal";
import PickColor from "./components/PickColor/PickColor";

const leftHero: IHero = {
  xCoord: GAMEPARAMS.heroSize,
  radius: GAMEPARAMS.heroSize,
  yCoord: GAMEPARAMS.height / 2 - GAMEPARAMS.heroSize / 2,
  color: "blue",
  speed: HEROSTARTPARAMS.speed,
  hitCount: 0,
  moveDirection: "up",
  shotSpeed: HEROSTARTPARAMS.shotSpeed,
  spells: [],
  place: "left",
  spellColor: Color.YELLOW,
};

const rightHero: IHero = {
  xCoord: GAMEPARAMS.width - GAMEPARAMS.heroSize,
  radius: GAMEPARAMS.heroSize,
  yCoord: GAMEPARAMS.height / 2 - GAMEPARAMS.heroSize / 2,
  color: "red",
  speed: HEROSTARTPARAMS.speed,
  hitCount: 0,
  moveDirection: "up",
  shotSpeed: HEROSTARTPARAMS.shotSpeed,
  spells: [],
  place: "right",
  spellColor: Color.GREEN,
};

function App() {
  const canvasRef: RefObject<HTMLCanvasElement> = useRef(null);
  const mouseCoordinates: MutableRefObject<IMouseCoordinates | null> =
    useRef(null);

  const [shotInterval, setShotInterval] = useState({
    p1: HEROSTARTPARAMS.shotSpeed,
    p2: HEROSTARTPARAMS.shotSpeed,
  });

  const [playersSpeed, setPlayersSpeed] = useState({
    p1: HEROSTARTPARAMS.speed,
    p2: HEROSTARTPARAMS.speed,
  });

  const [activeModalPlayer, setActiveModalPlayer] = useState({
    p1: false,
    p2: false,
  });

  const closeModalClick = () => {
    setActiveModalPlayer({
      p1: false,
      p2: false,
    });
  };

  const canvasMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (canvas) {
      mouseCoordinates.current = handleMouse(event, canvas, mouseCoordinates);
      const mc = mouseCoordinates.current;
      if (mc) {
        if (checkHoverHero(leftHero, mc) || checkHoverHero(rightHero, mc)) {
          canvas.style.cursor = "pointer";
        } else {
          canvas.style.cursor = "";
        }
      }
    }
  };

  const canvasClick = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    event.stopPropagation();
    const mc = mouseCoordinates.current;
    if (mc) {
      if (checkHoverHero(leftHero, mc)) {
        setActiveModalPlayer({ ...activeModalPlayer, p1: true });
      }

      if (checkHoverHero(rightHero, mc)) {
        setActiveModalPlayer({ ...activeModalPlayer, p2: true });
      }
    }
  };

  const canvasMouseLeave = () => {
    mouseCoordinates.current = null;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (canvas && ctx) {
      canvasInit(canvas);
      drawHero(ctx, leftHero);
      drawHero(ctx, rightHero);
    }
  }, [canvasRef]);

  useInterval(
    () => {
      frameFunction(
        canvasRef.current,
        mouseCoordinates.current,
        leftHero,
        rightHero
      );
    },
    activeModalPlayer.p1 || activeModalPlayer.p2 ? null : 20
  );

  useInterval(
    () => {
      heroSpellsGenerate(leftHero);
    },
    activeModalPlayer.p1 || activeModalPlayer.p2 ? null : shotInterval.p1 * 1000
  );

  useInterval(
    () => {
      heroSpellsGenerate(rightHero);
    },
    activeModalPlayer.p1 || activeModalPlayer.p2 ? null : shotInterval.p2 * 1000
  );

  return (
    <>
      <div className="game">
        <canvas
          onMouseLeave={canvasMouseLeave}
          onMouseMove={canvasMouseMove}
          ref={canvasRef}
          onClick={canvasClick}
          style={{ width: "100%" }}
          width={GAMEPARAMS.width}
          height={GAMEPARAMS.height}
        ></canvas>

        <Settings
          shotSpeedP1={shotInterval.p1}
          shotSpeedP2={shotInterval.p2}
          speedP1={playersSpeed.p1}
          speedP2={playersSpeed.p2}
          onChangeShotSpeedP1={(e) => {
            setShotInterval({ ...shotInterval, p1: Number(e.target.value) });
          }}
          onChangeShotSpeedP2={(e) => {
            setShotInterval({ ...shotInterval, p2: Number(e.target.value) });
          }}
          onChangeSpeedMoveP1={(e) => {
            setPlayersSpeed({ ...playersSpeed, p1: Number(e.target.value) });
            leftHero.speed = Number(e.target.value);
          }}
          onChangeSpeedMoveP2={(e) => {
            setPlayersSpeed({ ...playersSpeed, p2: Number(e.target.value) });
            rightHero.speed = Number(e.target.value);
          }}
        />
      </div>

      <Modal closeClick={closeModalClick} active={activeModalPlayer.p1}>
        <PickColor
          curColor={leftHero.spellColor}
          onChangeColor={(e) => {
            leftHero.spellColor = e.target.value;
          }}
          closeClick={closeModalClick}
        />
      </Modal>

      <Modal closeClick={closeModalClick} active={activeModalPlayer.p2}>
        <PickColor
          curColor={rightHero.spellColor}
          onChangeColor={(e) => {
            rightHero.spellColor = e.target.value;
          }}
          closeClick={closeModalClick}
        />
      </Modal>
    </>
  );
}

export default App;
