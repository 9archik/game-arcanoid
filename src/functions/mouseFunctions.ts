import { MutableRefObject } from "react";
import { IMouseCoordinates } from "../interface";
import { IHero } from "../interface";

export const handleMouse = (
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
  canvas: HTMLCanvasElement,
  mouseCoordinates: MutableRefObject<IMouseCoordinates | null>
) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Масштабировать координаты к натуральному размеру canvas
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let obj: IMouseCoordinates = {
    x: x * scaleX,
    y: y * scaleY,
  };

  return obj;
};

export const checkHoverHero = (hero: IHero, mc: IMouseCoordinates) => {
  if (
    mc.x >= hero.xCoord - hero.radius &&
    mc.x <= hero.xCoord + hero.radius &&
    mc.y >= hero.yCoord - hero.radius &&
    mc.y <= hero.yCoord + hero.radius
  ) {
    return true;
  }
  return false;
};
