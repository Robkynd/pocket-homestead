export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // Load grass tile
    this.load.image('grass', 'assets/ui/jidan.png');
  }

  create() {
    const tileSize = 64; // ukuran tile
    const width = this.scale.width;
    const height = this.scale.height;

    // --- Hitung jumlah tile ---
    const mapWidth = Math.ceil(width / tileSize);
    const mapHeight = Math.ceil(height / tileSize);

    // --- Full Grass Grid ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        this.add.image(x * tileSize, y * tileSize, 'grass').setOrigin(0);
      }
    }

    // --- Frame pinggir warna coklat ---
    const frameThickness = 8;
    const color = 0x8B4513; // coklat
    // Top
    this.add.rectangle(0, 0, width, frameThickness, color).setOrigin(0);
    // Bottom
    this.add.rectangle(0, height - frameThickness, width, frameThickness, color).setOrigin(0);
    // Left
    this.add.rectangle(0, 0, frameThickness, height, color).setOrigin(0);
    // Right
    this.add.rectangle(width - frameThickness, 0, frameThickness, height, color).setOrigin(0);

    // --- Jam realtime + hari ---
    const timeText = this.add.text(width / 2, frameThickness + 4, '', {
      fontSize: '16px',
      color: '#000',
      backgroundColor: '#ffffff',
      padding: { x: 8, y: 4 }
    }).setOrigin(0.5, 0);

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayName = days[now.getDay()];
        timeText.setText(`${dayName} - ${hours}:${minutes}:${seconds}`);
      }
    });
  }
}
