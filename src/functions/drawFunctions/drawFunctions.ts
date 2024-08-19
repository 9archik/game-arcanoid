import { GAMEPARAMS } from "../../constants/gameParams";
import { IHero, ISpell } from "../../interface";
export const canvasInit = (canvas: HTMLCanvasElement) => {
  const ctx = canvas?.getContext("2d");

  if (ctx) {
    canvas.style.background = "gray";
  }
};

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  color: string
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
};

export const drawHero = (ctx: CanvasRenderingContext2D, hero: IHero) => {
  drawCircle(ctx, hero.xCoord, hero.yCoord, hero.radius, hero.color);
};

export const drawSpell = (ctx: CanvasRenderingContext2D, spell: ISpell) => {
  drawCircle(ctx, spell.xCoord, spell.yCoord, spell.size, spell.color);
};

export const drawHeroSpellList = (
  ctx: CanvasRenderingContext2D,
  hero: IHero
) => {
  for (let i = 0; i < hero.spells.length; i++) {
    let spell = hero.spells[i];
    drawSpell(ctx, spell);
  }
};

export const drawHitCounter = (
  ctx: CanvasRenderingContext2D,
  h1: number,
  h2: number
) => {
  ctx.font = "32px Bungee Tint";
  ctx.fillStyle = "black";

  ctx.textAlign = "center"; // Выравнивание по центру

  // Текст, который нужно нарисовать
  const text = `${h1}:${h2}`;

  // Получить ширину текста
  const textWidth = ctx.measureText(text).width;

  // Вычислить координату X для выравнивания по центру
  const x = GAMEPARAMS.width / 2;

  // Рисовать текст
  ctx.fillText(text, x, 24); // (x, 100) - координаты текста на канвасе
};
