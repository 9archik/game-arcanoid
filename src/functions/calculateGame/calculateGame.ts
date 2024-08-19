import { IMouseCoordinates } from "../../interface";
import { IHero } from "../../interface";
import { GAMEPARAMS } from "../../constants/gameParams";
import { ISpell } from "../../interface";
import { removeElementAtIndex } from "../shared/deleteByIndexArr";
export const checkHeroMouseMeet = (
  mouseCoordinates: IMouseCoordinates,
  hero: IHero
) => {
  if (
    mouseCoordinates.x >= hero.xCoord - hero.radius &&
    mouseCoordinates.x <= hero.xCoord + hero.radius
  ) {
    if (
      hero.moveDirection === "down" &&
      mouseCoordinates.y - hero.radius >= hero.yCoord - 1 &&
      mouseCoordinates.y - hero.radius <= hero.yCoord + 1
    ) {
      hero.moveDirection = "up";
    }

    if (
      hero.moveDirection === "up" &&
      mouseCoordinates.y + hero.radius >= hero.yCoord - 1 &&
      mouseCoordinates.y + hero.radius <= hero.yCoord + 1
    ) {
      hero.moveDirection = "down";
    }
  }
};

export const checkCanvasBorderMeetHero = (hero: IHero) => {
  if (hero.yCoord <= GAMEPARAMS.heroSize) {
    hero.moveDirection = "down";
  }
  if (hero.yCoord >= GAMEPARAMS.height - GAMEPARAMS.heroSize) {
    hero.moveDirection = "up";
  }
};

export const heroSpellsGenerate = (hero: IHero) => {
  let spell: ISpell = {
    color: hero.spellColor,
    moveDirection: hero.place === "right" ? "left" : "right",
    yCoord: hero.yCoord,
    xCoord:
      hero.place === "left"
        ? hero.xCoord + hero.radius / 2
        : GAMEPARAMS.width - hero.radius / 2,
    size: GAMEPARAMS.spellsSize,
    speed: GAMEPARAMS.spellsMoveSpeed,
  };

  hero.spells.push(spell);
};

export const checkSpellHitHero = (spell: ISpell, hero: IHero) => {
  const distance = Math.sqrt(
    Math.pow(spell.xCoord - hero.xCoord, 2) +
      Math.pow(spell.yCoord - hero.yCoord, 2)
  );

  // Проверка, находится ли центр заклинания в пределах радиуса героя
  return distance <= hero.radius + spell.size;
};

export const checkSpellHitCanvasBorder = (spell: ISpell) => {
  if (spell !== undefined) {
    if (
      spell?.xCoord - spell.size <= 0 ||
      spell?.xCoord + spell.size >= GAMEPARAMS.width
    ) {
      return true;
    }
  }

  return false;
};

export const calculateSpellsMove = (fromHero: IHero, toHero: IHero) => {
  let heroSpells = fromHero.spells;

  for (let i = 0; i < heroSpells.length; i++) {
    if (fromHero.place === "left") {
      heroSpells[i].xCoord += GAMEPARAMS.spellsMoveSpeed;
    } else {
      heroSpells[i].xCoord -= GAMEPARAMS.spellsMoveSpeed;
    }

    if (checkSpellHitHero(heroSpells[i], toHero)) {
      fromHero.hitCount += 1;
      heroSpells.splice(i, 1);
    }

    if (checkSpellHitCanvasBorder(heroSpells[i])) {
      heroSpells.splice(i, 1);
    }
  }
};

export const calcHeroMoveParams = (
  hero: IHero,
  mouseCoordinates: IMouseCoordinates | null
) => {
  if (hero.moveDirection === "up") {
    hero.yCoord = hero.yCoord - hero.speed;
  } else {
    hero.yCoord = hero.yCoord + hero.speed;
  }
  checkCanvasBorderMeetHero(hero);
  if (mouseCoordinates) {
    checkHeroMouseMeet(mouseCoordinates, hero);
  }
};
