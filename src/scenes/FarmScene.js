export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    this.load.image('grass', 'assets/ui/grass.png');       // tile grass
    this.load.image('storeBtn', 'assets/ui/store.png');   // button store image
  }

  create() {
    const tileSize = 64;
    const width = this.scale.width;
    const height = this.scale.height;
    const sideThickness = 8;
    const frameColor = 0x8B4513;

    // --- Atur tinggi frame ---
    const topFrameHeight = 48;      // lebih kecil dari sebelumnya
    const bottomFrameHeight = 80;   // lebih lebar
    const leftRightThickness = sideThickness;

    // --- Hitung jumlah tile horizontal & vertikal untuk grass ---
    const mapWidth = Math.ceil((width - leftRightThickness*2) / tileSize);
    const mapHeight = Math.ceil((height - topFrameHeight - bottomFrameHeight) / tileSize);

    // --- Full Grass Grid di tengah ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const posX = leftRightThickness + x*tileSize;
        const posY = topFrameHeight + y*tileSize;
        this.add.image(posX, posY, 'grass').setOrigin(0);
      }
    }

    // --- Frame pinggir ---
    // Kiri & kanan tipis
    this.add.rectangle(0, 0, leftRightThickness, height, frameColor).setOrigin(0); // kiri
    this.add.rectangle(width - leftRightThickness, 0, leftRightThickness, height, frameColor).setOrigin(0); // kanan

    // Atas & bawah
    this.add.rectangle(leftRightThickness, 0, width - leftRightThickness*2, topFrameHeight, frameColor).setOrigin(0); // atas
    this.add.rectangle(leftRightThickness, height - bottomFrameHeight, width - leftRightThickness*2, bottomFrameHeight, frameColor).setOrigin(0); // bawah

    // --- Jam realtime di kiri atas ---
    const timeText = this.add.text(leftRightThickness + 10, topFrameHeight/2, '', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#fff',
      stroke: '#6b4f2c',
      strokeThickness: 2,
      shadow: { x: 1, y: 1, color: '#000', blur: 2 }
    }).setOrigin(0, 0.5);

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

    // --- Tombol STORE pakai gambar di frame bawah tengah ---
    const storeWidth = 80;
    const storeHeight = 40;

    const storeBtn = this.add.image(width / 2, height - bottomFrameHeight / 2, 'storeBtn')
      .setDisplaySize(storeWidth, storeHeight)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    storeBtn.on('pointerdown', () => {
      this.openStoreMenu();
    });
  }

  // --- Fungsi buka menu store ---
  openStoreMenu() {
    const { width, height } = this.scale;
    // Semi-transparent background
    const bg = this.add.rectangle(width/2, height/2, width*0.8, height*0.6, 0x654321, 0.85).setOrigin(0.5);

    // Title STORE
    const title = this.add.text(width/2, height/2 - 120, 'STORE', {
      fontSize: '22px',
      color: '#fff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Close button
    const closeBtn = this.add.text(width/2 + 150, height/2 - 120, 'X', {
      fontSize: '18px',
      color: '#fff',
      backgroundColor: '#8B0000',
      padding: { x: 5, y: 2 }
    }).setOrigin(0.5)
      .setInteractive();

    // Contoh item
    const item1 = this.add.text(width/2 - 80, height/2 - 60, 'Seed - $10', { fontSize: '16px', color: '#fff' }).setOrigin(0.5);
    const item2 = this.add.text(width/2 + 80, height/2 - 60, 'Watering Can - $25', { fontSize: '16px', color: '#fff' }).setOrigin(0.5);

    // Close handler
    closeBtn.on('pointerdown', () => {
      [bg, title, closeBtn, item1, item2].forEach(e => e.destroy());
    });
  }
}
