export default class Tile {
  public x: number = 0;

  public y: number = 0;

  public value: number = 0;

  public isRevealed: boolean = false;

  public isFlagged: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
