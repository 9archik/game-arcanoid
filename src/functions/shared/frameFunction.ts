import {
  calcHeroMoveParams,
  calculateSpellsMove,
} from "../calculateGame/calculateGame";
import {
  drawHero,
  drawHeroSpellList,
  drawHitCounter,
} from "../drawFunctions/drawFunctions";
import { IHero, IMouseCoordinates } from "../../interface";
import { GAMEPARAMS } from "../../constants/gameParams";
export const frameFunction = (
  canvas: HTMLCanvasElement | null | undefined,
  mouseCoordinates: IMouseCoordinates | null,
  leftHero: IHero,
  rightHero: IHero
) => {
  const ctx = canvas?.getContext("2d");
  if (ctx) {
    calcHeroMoveParams(leftHero, mouseCoordinates);
    calcHeroMoveParams(rightHero, mouseCoordinates);
    calculateSpellsMove(leftHero, rightHero);
    calculateSpellsMove(rightHero, leftHero);
    ctx.clearRect(0, 0, GAMEPARAMS.width, GAMEPARAMS.height);
    drawHero(ctx, leftHero);
    drawHero(ctx, rightHero);
    drawHeroSpellList(ctx, leftHero);
    drawHeroSpellList(ctx, rightHero);
    drawHitCounter(ctx, leftHero.hitCount, rightHero.hitCount);
  }
};
