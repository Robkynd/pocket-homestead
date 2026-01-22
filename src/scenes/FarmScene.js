export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('dirt', 'assets/ui/dirt.png');
    this.load.image('weatsoil', 'assets/ui/weatsoil.png');
  }

  create() {
    const SCREEN_WIDTH = this.scale.width;   // 360
    const SCREEN_HEIGHT = this.scale.height; // 640

    const TILE_SIZE = 48;
    const COLS = 7;
    const ROWS = 10;

    const TOP_BAR_HEIGHT = 64;
    const BOTTOM_BAR_HEIGHT = 96;

    // ===============================
    // TOP BAR (sementara kosong)
    // ===============================
    this.add.rectangle(
      0,
      0,
      SCREEN_WIDTH,
      TOP_BAR_HEIGHT,
      0x8B4513
    ).setOrigin(0);

    // ===============================
    // BOTTOM BAR (sementara kosong)
    // ===============================
    this.add.rectangle(
      0,
      SCREEN_HEIGHT - BOTTOM_BAR_HEIGHT,
      SCREEN_WIDTH,
      BOTTOM_BAR_HEIGHT,
      0x8B4513
    ).setOrigin(0);

    // ===============================
    // FARM GRID AREA
    // ===============================
    const GRID_WIDTH = COLS * TILE_SIZE;     // 336
    const GRID_HEIGHT = ROWS * TILE_SIZE;    // 480

    const GRID_START_X = (SCREEN_WIDTH - GRID_WIDTH) / 2; // 12px
    const GRID_START_Y = TOP_BAR_HEIGHT;                 // 64px

    this.tiles = [];

    for (let row = 0; row < ROWS; row++) {
      this.tiles[row] = [];

      for (let col = 0; col < COLS; col++) {
        const x = GRID_START_X + col * TILE_SIZE;
        const y = GRID_START_Y + row * TILE_SIZE;

        const tile = this.add
          .image(x, y, 'grass')
          .setOrigin(0)
          .setInteractive();

        this.tiles[row][col] = {
          image: tile,
          state: 'grass'
        };

        // ===============================
        // TILE INTERACTION
        // ===============================
        tile.on('pointerdown', () => {
          const t = this.tiles[row][col];

          if (t.state === 'grass') {
            t.state = 'dirt';
            t.image.setTexture('dirt');
          } 
          else if (t.state === 'dirt') {
            t.state = 'weatsoil';
            t.image.setTexture('weatsoil');
          }
        });
      }
    }
  }
}
