export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    this.load.image('grass', 'assets/ui/grass.png'); // pastikan path benar
  }

  create() {
    const tileSize = 64;           // tinggi frame atas/bawah
    const width = this.scale.width;
    const height = this.scale.height;

    const sideThickness = 8;       // frame tipis kiri & kanan
    const frameColor = 0x8B4513;

    // --- Hitung jumlah tile horizontal & vertikal untuk grass ---
    const mapWidth = Math.ceil((width - sideThickness*2) / tileSize);
    const mapHeight = Math.ceil((height - tileSize*2) / tileSize);

    // --- Full Grass Grid di tengah ---
    for (let y = 1; y <= mapHeight; y++) {         // mulai 1 untuk sisain frame atas
      for (let x = 1; x <= mapWidth; x++) {       // mulai 1 untuk sisain frame kiri
        const posX = sideThickness + (x-1)*tileSize;
        const posY = tileSize + (y-1)*tileSize;
        this.add.image(posX, posY, 'grass').setOrigin(0);
      }
    }

    // --- Frame pinggir ---
    // Kiri & kanan tipis
    this.add.rectangle(0, 0, sideThickness, height, frameColor).setOrigin(0); // kiri
    this.add.rectangle(width - sideThickness, 0, sideThickness, height, frameColor).setOrigin(0); // kanan
    // Atas & bawah tebal 1 tile
    this.add.rectangle(sideThickness, 0, width - sideThickness*2, tileSize, frameColor).setOrigin(0); // atas
    this.add.rectangle(sideThickness, height - tileSize, width - sideThickness*2, tileSize, frameColor).setOrigin(0); // bawah

    // --- Jam realtime di atas ---
    const timeText = this.add.text(width / 2, tileSize/4, '', {
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
  }
}
