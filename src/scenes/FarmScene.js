export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    // Tile & UI
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('dirt', 'assets/ui/dirt.png');
    this.load.image('weatsoil', 'assets/ui/weatsoil.png');
    this.load.image('well', 'assets/ui/well.png');
    this.load.image('store', 'assets/ui/store.png');
    this.load.image('storage', 'assets/ui/storage.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const tileSize = 64;
    const sideThickness = 8;
    const frameColor = 0x8B4513;

    // --- Frame ---
    // Kiri & kanan tipis
    this.add.rectangle(0, 0, sideThickness, height, frameColor).setOrigin(0);
    this.add.rectangle(width - sideThickness, 0, sideThickness, height, frameColor).setOrigin(0);
    // Atas & bawah tebal 1 tile
    this.add.rectangle(sideThickness, 0, width - sideThickness*2, tileSize, frameColor).setOrigin(0);
    this.add.rectangle(sideThickness, height - tileSize, width - sideThickness*2, tileSize, frameColor).setOrigin(0);

    // --- Jam kiri atas ---
    const timeText = this.add.text(sideThickness + 5, 5, '', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#fff',
      stroke: '#6b4f2c',
      strokeThickness: 2
    });

    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2,'0');
        const minutes = now.getMinutes().toString().padStart(2,'0');
        const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const dayName = days[now.getDay()];
        timeText.setText(`${dayName} ${hours}:${minutes}`);
      }
    });

    // --- Grass grid ---
    const availableWidth = width - sideThickness*2;
    const availableHeight = height - tileSize*2 - tileSize; // sisain frame bawah untuk UI
    const mapCols = Math.floor(availableWidth / tileSize);
    const mapRows = Math.floor(availableHeight / tileSize);
    const offsetX = sideThickness + (availableWidth - mapCols*tileSize)/2;
    const offsetY = tileSize + (availableHeight - mapRows*tileSize)/2;

    this.tiles = [];
    for (let y = 0; y < mapRows; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < mapCols; x++) {
        const posX = offsetX + x*tileSize;
        const posY = offsetY + y*tileSize;

        const tileImage = this.add.image(posX, posY, 'grass').setOrigin(0).setInteractive();
        this.tiles[y][x] = { image: tileImage, state: 'grass', x, y };

        tileImage.on('pointerdown', () => {
          const tile = this.tiles[y][x];
          if (tile.state === 'grass') {
            tile.state = 'dirt';
            tile.image.setTexture('dirt');
          } else if (tile.state === 'dirt') {
            if (this.wellWater > 0) {
              tile.state = 'weatsoil';
              tile.image.setTexture('weatsoil');
              this.wellWater = Math.max(this.wellWater - 1, 0);
              this.updateWellUI();
            }
          }
        });
      }
    }

    // --- UI: Bottom menu frame positions ---
    const uiY = height - tileSize + 8; // posisi UI di atas frame bawah
    const uiPadding = 10;

    // --- Store button ---
    const storeX = width/2 - 32;
    this.storeBtn = this.add.image(storeX, uiY, 'store').setOrigin(0).setInteractive().setDisplaySize(64, 64);
    this.storeBtn.on('pointerdown', () => {
      console.log('Store clicked');
      // nanti bisa muncul menu store
    });

    // --- Storage button ---
    const storageX = storeX - 80;
    this.storageBtn = this.add.image(storageX, uiY, 'storage').setOrigin(0).setInteractive().setDisplaySize(64, 64);
    this.storageBtn.on('pointerdown', () => {
      console.log('Storage clicked');
      // nanti bisa muncul menu storage
    });

    // --- Well button ---
    const wellX = storeX + 80;
    this.wellImage = this.add.image(wellX, uiY, 'well').setOrigin(0).setInteractive().setDisplaySize(64, 64);
    this.wellWater = 30;
    this.wellText = this.add.text(wellX, uiY + 65, `Water: ${this.wellWater}/100`, {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#00f',
      stroke: '#000',
      strokeThickness: 1
    });

    this.wellImage.on('pointerdown', () => {
      console.log('Well clicked, future upgrade logic');
    });

    this.updateWellUI();
  }

  updateWellUI() {
    this.wellText.setText(`Water: ${this.wellWater}/100`);
  }
}
