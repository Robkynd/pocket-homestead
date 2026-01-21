export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // Load grass tile
    this.load.image('grass', 'assets/ui/grass.png'); // pastikan path benar
  }

  create() {
    const tileSize = 64;
    const width = this.scale.width;
    const height = this.scale.height;

    // --- Hitung jumlah tile horizontal & vertikal ---
    const mapWidth = Math.ceil(width / tileSize);
    const mapHeight = Math.ceil(height / tileSize);

    // --- Full Grass Grid (di tengah, sisain 1 tile atas & bawah) ---
    for (let y = 1; y < mapHeight - 1; y++) {       // mulai dari 1, akhir mapHeight-1
      for (let x = 1; x < mapWidth - 1; x++) {    // sisain 1 tile pinggir kiri & kanan
        this.add.image(x * tileSize, y * tileSize, 'grass').setOrigin(0);
      }
    }

    // --- Frame pinggir coklat ---
    const frameThickness = tileSize;
    const frameColor = 0x8B4513;

    // Pinggir kiri
    this.add.rectangle(0, 0, frameThickness, height, frameColor).setOrigin(0);
    // Pinggir kanan
    this.add.rectangle(width - frameThickness, 0, frameThickness, height, frameColor).setOrigin(0);
    // Atas (1 tile)
    this.add.rectangle(frameThickness, 0, width - frameThickness*2, frameThickness, frameColor).setOrigin(0);
    // Bawah (1 tile)
    this.add.rectangle(frameThickness, height - frameThickness, width - frameThickness*2, frameThickness, frameColor).setOrigin(0);

    // --- Jam realtime di atas frame (placeholder) ---
    const timeText = this.add.text(width / 2, frameThickness/4, '', {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#fff',
      stroke: '#6b4f2c',
      strokeThickness: 2,
      shadow: { x: 1, y: 1, color: '#000', blur: 2 }
    }).setOrigin(0.5, 0);

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2,'0');
        const minutes = now.getMinutes().toString().padStart(2,'0');
        const seconds = now.getSeconds().toString().padStart(2,'0');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const dayName = days[now.getDay()];
        timeText.setText(`${dayName} - ${hours}:${minutes}:${seconds}`);
      }
    });

    // --- Frame bawah nanti bisa ditambahkan menu ---
    // Placeholder: bisa diganti sprite / button nanti
  }
}
