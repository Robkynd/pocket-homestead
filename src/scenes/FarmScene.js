export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('chickenCoop', 'assets/ui/chickencoop.png');
    this.load.image('barn', 'assets/ui/barn.png');
  }

  create() {
    const tileSize = 64;
    const mapWidth = 8;
    const mapHeight = 10;

    // --- UI Bar ---
    this.add.rectangle(0, 0, this.scale.width, tileSize, 0xcccccc).setOrigin(0);
    this.add.text(20, 20, '08:00 AM - Sunny', { fontSize: '16px', color: '#000' });

    // --- Grass map ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        this.add.image(x*tileSize, y*tileSize + tileSize, 'grass').setOrigin(0);
      }
    }

    // --- Barns / Coop ---
    this.add.image(tileSize*1, tileSize*6, 'chickenCoop').setOrigin(0);
    this.add.image(tileSize*6, tileSize*6, 'barn').setOrigin(0);
  }
}
