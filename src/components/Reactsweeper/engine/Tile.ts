export enum TileStatus {
  HIDDEN,
  FLAGGED,
  MARKED,
  REVEALED,
  BOOM,
  DEAD_REVEALED
}

export default class Tile {
  public x: number = 0;

  public y: number = 0;

  public value: number = 0;

  public status: TileStatus = TileStatus.HIDDEN;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public nextFlagStatus(allowMarks: boolean) {
    if (this.status === TileStatus.HIDDEN) return TileStatus.FLAGGED;
    if (this.status === TileStatus.FLAGGED) {
      if (allowMarks) return TileStatus.MARKED;
      return TileStatus.HIDDEN;
    }
    if (this.status === TileStatus.MARKED) return TileStatus.HIDDEN;
    return this.status;
  }
}
