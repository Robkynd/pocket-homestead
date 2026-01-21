export default class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // Load tiles
    this.load.image('grass', 'assets/tiles/grass.png');
    this.load.image('chickenCoop', 'assets/objects/chickencoop.png');
    this.load.image('barn', 'assets/objects/barn.png');  
  }

    // --- UI BAR ---
    this.add.rectangle(0, 0, this.scale.width, tileSize, 0xcccccc).setOrigin(0);
    this.add.text(20, 20, '08:00 AM - Sunny', { fontSize: '16px', color: '#000' });

    // --- Map background (grass) ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        this.add.image(x*tileSize, y*tileSize + tileSize, 'grass').setOrigin(0); // +tileSize untuk UI bar
      }
    }

 
    }

    // --- Barns / coop ---
    this.add.image(tileSize*1, tileSize*6, 'chickencoop').setOrigin(0); 
    this.add.image(tileSize*6, tileSize*6, 'barn').setOrigin(0);
  }
}
