export default class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // Load tiles
    this.load.image('grass', 'assets/tiles/grass.png');
    this.load.image('soil', 'assets/tiles/soil.png');
    this.load.image('fence', 'assets/objects/fence.png');
    this.load.image('chickenCoop', 'assets/objects/chicken_coop.png');
    this.load.image('cowBarn', 'assets/objects/cow_barn.png');
    this.load.image('sheepBarn', 'assets/objects/sheep_barn.png');
  }

  create() {
    const tileSize = 64;
    const mapWidth = 8;
    const mapHeight = 10;

    // --- UI BAR ---
    this.add.rectangle(0, 0, this.scale.width, tileSize, 0xcccccc).setOrigin(0);
    this.add.text(20, 20, '08:00 AM - Sunny', { fontSize: '16px', color: '#000' });

    // --- Map background (grass) ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        this.add.image(x*tileSize, y*tileSize + tileSize, 'grass').setOrigin(0); // +tileSize untuk UI bar
      }
    }

    // --- Mini farms 3x3 ---
    const miniFarms = [
      { startX: 1, startY: 2 }, // farm 1
      { startX: 4, startY: 2 }  // farm 2
    ];

    miniFarms.forEach(farm => {
      for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
          const soilTile = this.add.image((farm.startX + x)*tileSize, (farm.startY + y)*tileSize + tileSize, 'soil').setOrigin(0);
          soilTile.setInteractive();
          soilTile.on('pointerdown', () => {
            console.log(`Mini farm tapped: x=${farm.startX + x}, y=${farm.startY + y}`);
          });
        }
      }
    });

    // --- Fence around map ---
    for (let x = 0; x < mapWidth; x++) {
      this.add.image(x*tileSize, tileSize + 0*tileSize, 'fence').setOrigin(0); // top
      this.add.image(x*tileSize, tileSize + (mapHeight-1)*tileSize, 'fence').setOrigin(0); // bottom
    }
    for (let y = 0; y < mapHeight; y++) {
      this.add.image(0, tileSize + y*tileSize, 'fence').setOrigin(0); // left
      this.add.image((mapWidth-1)*tileSize, tileSize + y*tileSize, 'fence').setOrigin(0); // right
    }

    // --- Barns / coop ---
    this.add.image(tileSize*1, tileSize*6, 'chickenCoop').setOrigin(0); 
    this.add.image(tileSize*6, tileSize*6, 'cowBarn').setOrigin(0);
    this.add.image(tileSize*3, tileSize*9, 'sheepBarn').setOrigin(0);
  }
}
