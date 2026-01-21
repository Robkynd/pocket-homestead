export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
    this.storeOpen = false;
  }

  preload() {
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('storeBtn', 'assets/ui/store.png');
  }

  create() {
    const tileSize = 64;
    const width = this.scale.width;
    const height = this.scale.height;
    const sideThickness = 8;
    const frameColor = 0x8B4513;

    // --- Tinggi frame ---
    const topFrameHeight = 40;
    const bottomFrameHeight = 100;

    // --- Hitung map grass ---
    const mapWidth = Math.ceil((width - sideThickness*2) / tileSize);
    const mapHeight = Math.ceil((height - topFrameHeight - bottomFrameHeight) / tileSize);

    // --- Grass grid ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const posX = sideThickness + x*tileSize;
        const posY = topFrameHeight + y*tileSize;
        this.add.image(posX, posY, 'grass').setOrigin(0);
      }
    }

    // --- Frame pinggir ---
    this.add.rectangle(0, 0, sideThickness, height, frameColor).setOrigin(0); // kiri
    this.add.rectangle(width - sideThickness, 0, sideThickness, height, frameColor).setOrigin(0); // kanan
    this.add.rectangle(sideThickness, 0, width - sideThickness*2, topFrameHeight, frameColor).setOrigin(0); // atas
    this.add.rectangle(sideThickness, height - bottomFrameHeight, width - sideThickness*2, bottomFrameHeight, frameColor).setOrigin(0); // bawah

    // --- Jam realtime kiri atas ---
    const timeText = this.add.text(sideThickness + 8, topFrameHeight/2, '', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#fff',
      stroke: '#6b4f2c',
      strokeThickness: 2
    }).setOrigin(0,0.5);

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2,'0');
        const minutes = now.getMinutes().toString().padStart(2,'0');
        const seconds = now.getSeconds().toString().padStart(2,'0');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        timeText.setText(`${days[now.getDay()]} - ${hours}:${minutes}:${seconds}`);
      }
    });

    // --- Tombol store di frame bawah tengah ---
    const storeSize = 50;
    const storeBtn = this.add.image(width/2, height - bottomFrameHeight/2, 'storeBtn')
      .setDisplaySize(storeSize, storeSize)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    storeBtn.on('pointerdown', () => {
      if (!this.storeOpen) this.openStoreMenu();
    });
  }

  openStoreMenu() {
    const { width, height } = this.scale;
    this.storeOpen = true;

    // --- Semi-transparent background store ---
    const bgWidth = width * 0.85;
    const bgHeight = height * 0.6;
    const bg = this.add.rectangle(width/2, height/2, bgWidth, bgHeight, 0x654321, 0.95).setOrigin(0.5);

    // --- Title ---
    const title = this.add.text(width/2, height/2 - bgHeight/2 + 20, 'STORE', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#fff'
    }).setOrigin(0.5, 0);

    // --- Close button ---
    const closeBtn = this.add.text(width/2 + bgWidth/2 - 20, height/2 - bgHeight/2 + 20, 'X', {
      fontSize: '18px',
      color: '#fff',
      backgroundColor: '#8B0000',
      padding: { x: 5, y: 2 }
    }).setOrigin(0.5,0).setInteractive();

    closeBtn.on('pointerdown', () => {
      [bg, title, closeBtn, ...itemTexts].forEach(e => e.destroy());
      this.storeOpen = false;
    });

    // --- Daftar item ---
    const itemTexts = [];
    const padding = 30;
    let startY = height/2 - 60;

    const seeds = [
      { name: 'Carrot', price: 10 },
      { name: 'Corn', price: 12 },
      { name: 'Chili', price: 8 },
      { name: 'Cabbage', price: 15 }
    ];

    const fruits = [
      { name: 'Strawberry', price: 20 },
      { name: 'Pineapple', price: 25 },
      { name: 'Watermelon', price: 30 },
      { name: 'Orange', price: 22 }
    ];

    // --- Bibit ---
    const seedTitle = this.add.text(width/2 - bgWidth/4, startY - padding, 'Seeds', { fontSize: '16px', color: '#fff' }).setOrigin(0.5,0);
    itemTexts.push(seedTitle);
    seeds.forEach((item, idx) => {
      const t = this.add.text(width/2 - bgWidth/4, startY + idx*22, `${item.name} - $${item.price}`, { fontSize: '14px', color: '#fff' }).setOrigin(0.5,0);
      t.setInteractive({ useHandCursor: true });
      t.on('pointerdown', () => {
        console.log(`Buy ${item.name} for $${item.price} (2% fee to dev)`);
      });
      itemTexts.push(t);
    });

    // --- Fruits ---
    const fruitTitle = this.add.text(width/2 + bgWidth/4, startY - padding, 'Fruits', { fontSize: '16px', color: '#fff' }).setOrigin(0.5,0);
    itemTexts.push(fruitTitle);
    fruits.forEach((item, idx) => {
      const t = this.add.text(width/2 + bgWidth/4, startY + idx*22, `${item.name} - $${item.price}`, { fontSize: '14px', color: '#fff' }).setOrigin(0.5,0);
      t.setInteractive({ useHandCursor: true });
      t.on('pointerdown', () => {
        console.log(`Buy ${item.name} for $${item.price} (2% fee to dev)`);
      });
      itemTexts.push(t);
    });
  }
}
