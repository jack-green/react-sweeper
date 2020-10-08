import Tile from './Tile';

const offsets = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];

export default class Game {
  private width:number = 0;

  private height: number = 0;

  private data: Tile[] = [];

  constructor(settings: any) {
    this.generate(settings);
  }

  set(x: number, y: number, tile: Tile) {
    this.data[y * this.width + x] = tile;
  }

  setValue(x: number, y: number, value: number) {
    this.data[y * this.width + x].value = value;
  }

  public get(x: number, y: number) {
    return this.data[y * this.width + x];
  }

  public value(x: number, y: number) {
    return this.get(x, y).value;
  }

  public isRevealed(x: number, y: number) {
    return this.get(x, y).isRevealed;
  }

  public isFlagged(x: number, y: number) {
    return this.get(x, y).isFlagged;
  }

  public reveal(x: number, y: number) {
    const tile = this.get(x, y);
    tile.isRevealed = true;
  }

  public flag(x: number, y: number) {
    const tile = this.get(x, y);
    tile.isFlagged = true;
  }

  inBounds(x: number, y: number) {
    return x > -1 && y > -1 && x < this.width && y < this.width;
  }

  generate(settings: any) {
    this.width = settings.width;
    this.height = settings.height;
    this.data = new Array(this.width * this.height);

    // create empty grid
    for (let y = 0; y < this.width; y += 1) {
      for (let x = 0; x < this.height; x += 1) {
        this.set(x, y, new Tile(x, y));
      }
    }

    // place mines
    let mineCount = settings.mines;
    while (mineCount > 0) {
      const x = Math.floor(Math.random() * settings.width);
      const y = Math.floor(Math.random() * settings.height);
      if (this.value(x, y) !== -1) {
        this.setValue(x, y, -1);
        offsets.forEach((offset) => {
          const dx = x + offset[0];
          const dy = y + offset[1];
          if (!this.inBounds(dx, dy)) return;
          const current = this.value(dx, dy);
          if (current === -1) return;
          this.setValue(dx, dy, current + 1);
        });
        mineCount -= 1;
      }
    }
  }
}
