export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
    this.storeOpen = false;
    this.storageOpen = false;
  }

  preload() {
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('storeBtn', 'assets/ui/store.png');
    this.load.image('storageBtn', 'assets/ui/storage.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const sideThickness = 8;
    const topFrameHeight = 30;
    const bottomFrameHeight = 100;
    const frameColor = 0x8B4513;

    // --- Hitung area grass ---
    const areaWidth = width - sideThickness * 2;
    const areaHeight = height - topFrameHeight - bottomFrameHeight;

    // --- Tentuin ukuran tile persegi maksimal ---
    const tileSize = Math.floor(Math.min(areaWidth / 12, areaHeight / 24));

    // --- Hitung jumlah tile horizontal & vertikal ---
    const mapWidth = Math.floor(areaWidth / tileSize);
    const mapHeight = Math.floor(areaHeight / tileSize);

    console.log('tileSize:', tileSize, 'mapWidth:', mapWidth, 'mapHeight:', mapHeight);

    // --- Full Grass Grid ---
    for (let y = 0; y < mapHeight; y++) {
      for (let x = 0; x < mapWidth; x++) {
        const posX = sideThickness + x * tileSize;
        const posY = topFrameHeight + y * tileSize;
        this.add.image(posX, posY, 'grass').setOrigin(0).setDisplaySize(tileSize, tileSize);
      }
    }

    // --- Frame pinggir ---
    this.add.rectangle(0, 0, sideThickness, height, frameColor).setOrigin(0); // kiri
    this.add.rectangle(width - sideThickness, 0, sideThickness, height, frameColor).setOrigin(0); // kanan
    this.add.rectangle(sideThickness, 0, width - sideThickness*2, topFrameHeight, frameColor).setOrigin(0); // atas
    this.add.rectangle(sideThickness, height - bottomFrameHeight, width - sideThickness*2, bottomFrameHeight, frameColor).setOrigin(0); // bawah

    // --- Jam realtime kiri atas ---
    const timeText = this.add.text(sideThickness + 5, topFrameHeight/2, '', {
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

    // --- Tombol Store di bawah kanan ---
    const storeBtn = this.add.image(width/2 + 40, height - bottomFrameHeight/2, 'storeBtn')
      .setDisplaySize(50, 50)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    storeBtn.on('pointerdown', () => {
      if (!this.storeOpen) this.openStoreMenu();
    });

    // --- Tombol Storage di bawah kiri ---
    const storageBtn = this.add.image(width/2 - 40, height - bottomFrameHeight/2, 'storageBtn')
      .setDisplaySize(50, 50)
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true });

    storageBtn.on('pointerdown', () => {
      if (!this.storageOpen) this.openStorageMenu();
    });
  }

  openStoreMenu() {
    if(this.storeOpen) return;
    this.storeOpen = true;

    const { width, height } = this.scale;
    const bgWidth = width * 0.85;
    const bgHeight = height * 0.6;

    const bg = this.add.rectangle(width/2, height/2, bgWidth, bgHeight, 0x654321, 0.95).setOrigin(0.5);
    const title = this.add.text(width/2, height/2 - bgHeight/2 + 20, 'STORE', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#fff'
    }).setOrigin(0.5, 0);

    const closeBtn = this.add.text(width/2 + bgWidth/2 - 20, height/2 - bgHeight/2 + 20, 'X', {
      fontSize: '18px',
      color: '#fff',
      backgroundColor: '#8B0000',
      padding: { x: 5, y: 2 }
    }).setOrigin(0.5,0).setInteractive();

    closeBtn.on('pointerdown', () => {
      [bg, title, closeBtn].forEach(e => e.destroy());
      this.storeOpen = false;
    });
  }

  openStorageMenu() {
    if(this.storageOpen) return;
    this.storageOpen = true;

    const { width, height } = this.scale;
    const bgWidth = width * 0.85;
    const bgHeight = height * 0.6;
    const bg = this.add.rectangle(width/2, height/2, bgWidth, bgHeight, 0x444444, 0.95).setOrigin(0.5);

    const title = this.add.text(width/2, height/2 - bgHeight/2 + 20, 'STORAGE', {
      fontSize: '20px',
      fontFamily: 'Arial',
      color: '#fff'
    }).setOrigin(0.5, 0);

    const closeBtn = this.add.text(width/2 + bgWidth/2 - 20, height/2 - bgHeight/2 + 20, 'X', {
      fontSize: '18px',
      color: '#fff',
      backgroundColor: '#8B0000',
      padding: { x: 5, y: 2 }
    }).setOrigin(0.5,0).setInteractive();

    // --- Dummy player storage table ---
    this.playerStorage = {
      'Carrot': 2,
      'Corn': 3,
      'Chili': 1,
      'Cabbage': 4,
      'Strawberry': 2,
      'Pineapple': 1,
      'Watermelon': 1,
      'Orange': 3
    };

    const startY = height/2 - bgHeight/2 + 60;
    const colX1 = width/2 - 50; // Name
    const colX2 = width/2 + 50; // Quantity
    const itemTexts = [];

    let rowY = startY;
    Object.keys(this.playerStorage).forEach((item) => {
      const nameText = this.add.text(colX1, rowY, item, { fontSize: '14px', color: '#fff' }).setOrigin(0.5,0);
      const qtyText  = this.add.text(colX2, rowY, this.playerStorage[item], { fontSize: '14px', color: '#fff' }).setOrigin(0.5,0);
      itemTexts.push(nameText, qtyText);
      rowY += 20;
    });

    closeBtn.on('pointerdown', () => {
      [bg, title, closeBtn, ...itemTexts].forEach(e => e.destroy());
      this.storageOpen = false;
    });
  }
}
