export interface IHero {
  readonly xCoord: number;
  readonly radius: number;
  yCoord: number;
  color: string;
  speed: number;
  hitCount: number;
  moveDirection: "up" | "down";
  shotSpeed: number;
  spells: ISpell[];
  place: "left" | "right";
  spellColor: string;
}

export interface ISpell {
  color: string;
  readonly size: number;
  readonly speed: number;
  readonly moveDirection: "left" | "right";
  xCoord: number;
  yCoord: number;
}

export interface IMouseCoordinates {
  x: number;
  y: number;
}
