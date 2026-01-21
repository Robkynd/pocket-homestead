export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // --- Load grass tile ---
    this.load.image('grass', 'assets/ui/grass.png'); // pastikan path & nama file benar
  }

  create() {
    const tileSize = 64;           // ukuran tile
    const width = this.scale.width;
    const height = this.scale.height;

    const uiHeight = 64;           // tinggi UI bar untuk jam/hari

    // --- Full Grass Grid (di bawah UI bar) ---
    const mapWidth = Math.ceil(width / tileSize);
    const mapHeight = Math.ceil((height - uiHeight) / tileSize);

    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        this.add.image(x * tileSize, y * tileSize + uiHeight, 'grass').setOrigin(0);
      }
    }

    // --- Frame pinggir coklat ---
    const frameThickness = 8;
    const frameColor = 0x8B4513; // coklat
    // Top
    this.add.rectangle(0, 0, width, frameThickness, frameColor).setOrigin(0);
    // Bottom
    this.add.rectangle(0, height - frameThickness, width, frameThickness, frameColor).setOrigin(0);
    // Left
    this.add.rectangle(0, 0, frameThickness, height, frameColor).setOrigin(0);
    // Right
    this.add.rectangle(width - frameThickness, 0, frameThickness, height, frameColor).setOrigin(0);

    // --- UI Bar Background ---
    this.add.rectangle(0, frameThickness, width, uiHeight - frameThickness, 0xeeeeee).setOrigin(0);

    // --- Jam realtime + hari (fancy) ---
    const timeText = this.add.text(width / 2, frameThickness + 8, '', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#000',
      stroke: '#6b4f2c',      // stroke coklat gelap
      strokeThickness: 3,
      shadow: { x: 2, y: 2, color: '#888', blur: 2 }
    }).setOrigin(0.5, 0);

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const dayName = days[now.getDay()];
        timeText.setText(`${dayName} - ${hours}:${minutes}:${seconds}`);
      }
    });
  }
