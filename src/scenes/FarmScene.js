export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // --- Load tiles / objek ---
    this.load.image('grass', 'assets/ui/grass.png');        // 64x64 px
    this.load.image('chickenCoop', 'assets/ui/chickencoop.png');
    this.load.image('barn', 'assets/ui/barn.png');
  }

  create() {
    const tileSize = 64;       // Ukuran setiap tile
    const mapWidth = Math.ceil(this.scale.width / tileSize);   // Hitung berapa tile horizontal
    const mapHeight = Math.ceil(this.scale.height / tileSize); // Hitung berapa tile vertical

    // --- UI Bar di atas ---
    const uiHeight = tileSize;
    this.add.rectangle(0, 0, this.scale.width, uiHeight, 0xcccccc).setOrigin(0);
    this.add.text(20, 20, '08:00 AM - Sunny', { fontSize: '16px', color: '#000' });

    // --- Full Grass Map ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        // Offset y = uiHeight supaya UI bar nggak ketutup
        this.add.image(x * tileSize, y * tileSize + uiHeight, 'grass').setOrigin(0);
      }
    }

    // --- Barns / Coop ---
    // Contoh posisinya tetap relatif ke tileSize
    this.add.image(tileSize * 1, tileSize * 6, 'chickenCoop').setOrigin(0);
    this.add.image(tileSize * 6, tileSize * 6, 'barn').setOrigin(0);

    // --- Optional: Grid debug / bisa hapus ---
    // for (let y = 0; y < mapHeight; y++) {
    //   for (let x = 0; x < mapWidth; x++) {
    //     this.add.rectangle(x*tileSize + tileSize/2, y*tileSize + tileSize/2 + uiHeight, tileSize, tileSize)
    //         .setStrokeStyle(1, 0xff0000);
    //   }
    // }
  }
}
