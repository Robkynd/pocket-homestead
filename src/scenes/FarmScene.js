export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
    this.storeOpen = false;
    this.storageOpen = false;
    this.tileSprites = []; // simpan semua tile sprite untuk interaksi
  }

  preload() {
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('dirt', 'assets/ui/dirt.png');
    this.load.image('storeBtn', 'assets/ui/store.png');
    this.load.image('storageBtn', 'assets/ui/storage.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // --- Frame settings ---
    const frameThicknessSide = 8;
    const frameHeightTop = 40;
    const frameHeightBottom = 120;
    const frameColor = 0x8B4513;

    // --- Area grass ---
    const areaWidth = width - frameThicknessSide*2;
    const areaHeight = height - frameHeightTop - frameHeightBottom;

    const tileSize = 64;
    const tileCols = Math.floor(areaWidth / tileSize);
    const tileRows = Math.floor(areaHeight / tileSize);

    const offsetX = frameThicknessSide + (areaWidth - tileCols*tileSize)/2;
    const offsetY = frameHeightTop + (areaHeight - tileRows*tileSize)/2;

    // --- Full Grass Grid ---
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0x000000, 0.4);

    for (let y = 0; y < tileRows; y++) {
      this.tileSprites[y] = [];
      for (let x = 0; x < tileCols; x++) {
        const posX = offsetX + x*tileSize;
        const posY = offsetY + y*tileSize;
        const tile = this.add.image(posX, posY, 'grass')
          .setOrigin(0)
          .setDisplaySize(tileSize, tileSize)
          .setInteractive({useHandCursor:true});

        // tiap tile bisa di tap → ganti jadi dirt
        tile.on('pointerdown', () => {
          tile.setTexture('dirt');
        });

        this.tileSprites[y][x] = tile;
        graphics.strokeRect(posX, posY, tileSize, tileSize);
      }
    }

    // --- Frame ---
    this.add.rectangle(0, 0, frameThicknessSide, height, frameColor).setOrigin(0);
    this.add.rectangle(width - frameThicknessSide, 0, frameThicknessSide, height, frameColor).setOrigin(0);
    this.add.rectangle(frameThicknessSide, 0, width - frameThicknessSide*2, frameHeightTop, frameColor).setOrigin(0);
    this.add.rectangle(frameThicknessSide, height - frameHeightBottom, width - frameThicknessSide*2, frameHeightBottom, frameColor).setOrigin(0);

    // --- Jam realtime kiri atas ---
    const timeText = this.add.text(frameThicknessSide + 5, frameHeightTop/2, '', {
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

    // --- Tombol Store & Storage ---
    const storeBtn = this.add.image(width/2 + 40, height - frameHeightBottom/2, 'storeBtn')
      .setDisplaySize(50,50).setOrigin(0.5).setInteractive({useHandCursor:true});

    const storageBtn = this.add.image(width/2 - 40, height - frameHeightBottom/2, 'storageBtn')
      .setDisplaySize(50,50).setOrigin(0.5).setInteractive({useHandCursor:true});

    storeBtn.on('pointerdown', () => {
      if(!this.storeOpen) this.openStoreMenu();
    });
    storageBtn.on('pointerdown', () => {
      if(!this.storageOpen) this.openStorageMenu();
    });
  }

  openStoreMenu() {
    if(this.storeOpen) return;
    this.storeOpen = true;

    const {width, height} = this.scale;
    const bgWidth = width*0.85;
    const bgHeight = height*0.5;

    const bg = this.add.rectangle(width/2, height - bgHeight/2 - 10, bgWidth, bgHeight, 0x654321, 0.95).setOrigin(0.5);
    const title = this.add.text(width/2, height - bgHeight + 20, 'STORE', {
      fontSize: '20px', fontFamily:'Arial', color:'#fff'
    }).setOrigin(0.5,0);

    const closeBtn = this.add.text(width/2 + bgWidth/2 - 20, height - bgHeight + 20, 'X', {
      fontSize:'18px', color:'#fff', backgroundColor:'#8B0000', padding:{x:5,y:2}
    }).setOrigin(0.5,0).setInteractive();

    const storeItems = [
      {name:'Carrot', price:2}, {name:'Corn', price:3}, {name:'Chili', price:1}, {name:'Cabbage', price:4},
      {name:'Strawberry', price:5}, {name:'Pineapple', price:6}, {name:'Watermelon', price:7}, {name:'Orange', price:4}
    ];

    const itemTexts = [];
    let rowY = height - bgHeight + 60;
    const colX1 = width/2 - 50; // name
    const colX2 = width/2 + 50; // price

    storeItems.forEach(item=>{
      const nameText = this.add.text(colX1,rowY,item.name,{fontSize:'14px',color:'#fff'}).setOrigin(0.5,0);
      const priceText = this.add.text(colX2,rowY,item.price + ' $',{fontSize:'14px',color:'#fff'}).setOrigin(0.5,0);
      itemTexts.push(nameText, priceText);
      rowY += 20;
    });

    closeBtn.on('pointerdown', () => {
      [bg, title, closeBtn, ...itemTexts].forEach(e=>e.destroy());
      this.storeOpen = false;
    });
  }

  openStorageMenu() {
    if(this.storageOpen) return;
    this.storageOpen = true;

    const { width, height } = this.scale;
    const bgWidth = width*0.85;
    const bgHeight = height*0.5;

    const bg = this.add.rectangle(width/2, height - bgHeight/2 - 10, bgWidth, bgHeight, 0x444444, 0.95).setOrigin(0.5);
    const title = this.add.text(width/2, height - bgHeight + 20, 'STORAGE', {
      fontSize: '20px', fontFamily:'Arial', color:'#fff'
    }).setOrigin(0.5,0);

    const closeBtn = this.add.text(width/2 + bgWidth/2 - 20, height - bgHeight + 20, 'X', {
      fontSize:'18px', color:'#fff', backgroundColor:'#8B0000', padding:{x:5,y:2}
    }).setOrigin(0.5,0).setInteractive();

    this.playerStorage = this.playerStorage || {
      'Carrot':2, 'Corn':3, 'Chili':1, 'Cabbage':4,
      'Strawberry':2, 'Pineapple':1, 'Watermelon':1, 'Orange':3
    };

    const itemTexts = [];
    let rowY = height - bgHeight + 60;
    const colX1 = width/2 - 50;
    const colX2 = width/2 + 50;

    Object.keys(this.playerStorage).forEach(item=>{
      const nameText = this.add.text(colX1,rowY,item,{fontSize:'14px',color:'#fff'}).setOrigin(0.5,0);
      const qtyText = this.add.text(colX2,rowY,this.playerStorage[item],{fontSize:'14px',color:'#fff'}).setOrigin(0.5,0);
      itemTexts.push(nameText, qtyText);
      rowY += 20;
    });

    closeBtn.on('pointerdown', () => {
      [bg, title, closeBtn, ...itemTexts].forEach(e=>e.destroy());
      this.storageOpen = false;
    });
  }
}
