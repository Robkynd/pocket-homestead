export default class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // Load tiles / objek
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('chickenCoop', 'assets/ui/chickencoop.png');
    this.load.image('barn', 'assets/ui/barn.png');
  }

  create() {
    const tileSize = 64; // Ukuran tile
    const mapWidth = 8;  // Grid horizontal
    const mapHeight = 10; // Grid vertical

    // --- UI BAR ---
    this.add.rectangle(0, 0, this.scale.width, tileSize, 0xcccccc).setOrigin(0);
    this.add.text(20, 20, '08:00 AM - Sunny', { fontSize: '16px', color: '#000' });

    // --- Map background (grass) ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        this.add.image(x * tileSize, y * tileSize + tileSize, 'grass').setOrigin(0);
      }
    }

    // --- Barns / coop ---
    this.add.image(tileSize * 1, tileSize * 6, 'chickenCoop').setOrigin(0); 
    this.add.image(tileSize * 6, tileSize * 6, 'barn').setOrigin(0);
  }
}
