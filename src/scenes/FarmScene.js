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
    this.add.rectangle(0, 0, sideThickness, height, frameColor).setOrigin(0); // kiri
    this.add.rectangle(width - sideThickness, 0, sideThickness, height, frameColor).setOrigin(0); // kanan
    this.add.rectangle(sideThickness, 0, width - sideThickness*2, tileSize, frameColor).setOrigin(0); // atas
    this.add.rectangle(sideThickness, height - tileSize, width - sideThickness*2, tileSize, frameColor).setOrigin(0); // bawah

    // --- UI: Jam kiri atas ---
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
    const mapWidth = Math.floor((width - sideThickness*2) / tileSize);
    const mapHeight = Math.floor((height - tileSize*2) / tileSize);

    this.tiles = []; // 2D array tiles
    for (let y = 0; y < mapHeight; y++) {
      this.tiles[y] = [];
      for (let x = 0; x < mapWidth; x++) {
        const posX = sideThickness + x*tileSize;
        const posY = tileSize + y*tileSize;

        const tileImage = this.add.image(posX, posY, 'grass').setOrigin(0).setInteractive();
        // Simpan tile state
        this.tiles[y][x] = { image: tileImage, state: 'grass', x, y };

        // Touch interaction
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

    // --- Well setup ---
    this.wellWater = 30; // max 100
    const wellX = width - sideThickness - 64 - 10; // pojok kanan bawah area frame
    const wellY = height - tileSize - 64 - 10;
    this.wellImage = this.add.image(wellX, wellY, 'well').setOrigin(0).setInteractive();

    this.wellText = this.add.text(wellX, wellY + 65, `Water: ${this.wellWater}/100`, {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#00f',
      stroke: '#000',
      strokeThickness: 1
    });

    // Optional: klik well buat refill (future upgrade)
    this.wellImage.on('pointerdown', () => {
      console.log('Well clicked, future upgrade logic here');
    });

    this.updateWellUI();
  }

  updateWellUI() {
    this.wellText.setText(`Water: ${this.wellWater}/100`);
  }
}
