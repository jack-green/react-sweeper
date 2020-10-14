import Tile, { TileStatus } from './Tile';

const offsets = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]];

export default class Game {
  public width:number = 0;

  public height: number = 0;

  private data: Tile[] = [];

  public onUpdate: Function = () => {};

  public flagCount: number = 0;

  public revealedTileCount: number = 0;

  restart(settings: any) {
    this.generate(settings);
  }

  handleUpdate() {
    this.flagCount = 0;
    this.revealedTileCount = 0;
    this.data.forEach((tile) => {
      if (tile.status === TileStatus.FLAGGED) this.flagCount += 1;
      else if (tile.status === TileStatus.REVEALED) this.revealedTileCount += 1;
    });
    this.onUpdate(JSON.stringify(this.data));
  }

  set(x: number, y: number, tile: Tile) {
    this.data[y * this.width + x] = tile;
  }

  setValue(x: number, y: number, value: number) {
    this.data[y * this.width + x].value = value;
  }

  setStatus(x: number, y: number, status: TileStatus) {
    this.data[y * this.width + x].status = status;
  }

  public get(x: number, y: number) {
    return this.data[y * this.width + x];
  }

  public getValue(x: number, y: number) {
    return this.get(x, y).value;
  }

  public getStatus(x: number, y: number) {
    return this.get(x, y).status;
  }

  public reveal(x: number, y: number) {
    const tile = this.get(x, y);
    this.setStatus(x, y, TileStatus.REVEALED);
    if (tile.value === 0) {
      this.revealSurrounding(tile);
    }
    this.handleUpdate();
  }

  private revealSurrounding(centerTile: Tile) {
    offsets.forEach((offset) => {
      const dx = centerTile.x + offset[0];
      const dy = centerTile.y + offset[1];
      if (!this.inBounds(dx, dy)) return;
      const tile = this.get(dx, dy);
      if (tile.value !== -1 && tile.status === TileStatus.HIDDEN) {
        this.setStatus(dx, dy, TileStatus.REVEALED);
        if (tile.value === 0) {
          this.revealSurrounding(tile);
        }
      }
    });
  }

  public flag(x: number, y: number, allowMarks: boolean) {
    const tile = this.get(x, y);
    this.setStatus(x, y, tile.nextFlagStatus(allowMarks));
    this.handleUpdate();
  }

  public unmarkAll() {
    this.data.forEach((tile) => {
      if (tile.status === TileStatus.MARKED) {
        this.setStatus(tile.x, tile.y, TileStatus.HIDDEN);
      }
    });
    this.handleUpdate();
  }

  public win() {
    this.data.forEach((tile) => {
      if (tile.status !== TileStatus.FLAGGED && tile.value === -1) {
        this.setStatus(tile.x, tile.y, TileStatus.FLAGGED);
      }
    });
    this.handleUpdate();
  }

  public dead(boomTile: Tile) {
    this.setStatus(boomTile.x, boomTile.y, TileStatus.BOOM);
    this.data.forEach((tile) => {
      if (tile.status !== TileStatus.REVEALED && tile.value === -1) {
        this.setStatus(tile.x, tile.y, TileStatus.DEAD_REVEALED);
      }
    });
    this.handleUpdate();
  }

  inBounds(x: number, y: number) {
    return x > -1 && y > -1 && x < this.width && y < this.height;
  }

  generate(settings: any) {
    this.width = settings.width;
    this.height = settings.height;
    this.data = new Array(this.width * this.height);

    // create empty grid
    for (let y = 0; y < this.height; y += 1) {
      for (let x = 0; x < this.width; x += 1) {
        this.set(x, y, new Tile(x, y));
      }
    }

    // place mines
    let mineCount = settings.mines;
    while (mineCount > 0) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      if (this.getValue(x, y) !== -1) {
        this.setValue(x, y, -1);
        offsets.forEach((offset) => {
          const dx = x + offset[0];
          const dy = y + offset[1];
          if (!this.inBounds(dx, dy)) return;
          const current = this.getValue(dx, dy);
          if (current === -1) return;
          this.setValue(dx, dy, current + 1);
        });
        mineCount -= 1;
      }
    }
    this.handleUpdate();
  }
}
