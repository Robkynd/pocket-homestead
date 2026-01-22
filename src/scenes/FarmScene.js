export class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
    this.tileSprites = [];
    this.playerStorage = {};
    this.storeOpen = false;
    this.storageOpen = false;
    this.seedGrowTime = {
      Carrot: 60,
      Corn: 90,
      Chili: 45,
      Cabbage: 120,
      Strawberry: 60,
      Pineapple: 150,
      Watermelon: 180,
      Orange: 90
    };
    this.seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
  }

  preload() {
    // Tiles & UI
    this.load.image('grass', 'assets/ui/grass.png');
    this.load.image('dirt', 'assets/ui/dirt.png');
    this.load.image('storeBtn', 'assets/ui/store.png');
    this.load.image('storageBtn', 'assets/ui/storage.png');

    // Season images
    this.load.image('Spring', 'assets/ui/spring.png');
    this.load.image('Summer', 'assets/ui/summer.png');
    this.load.image('Autumn', 'assets/ui/autum.png');
    this.load.image('Winter', 'assets/ui/winter.png');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // --- Frame settings ---
    const frameThicknessSide = 8;
    const frameHeightTop = 35;
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

        tile.on('pointerdown', () => this.plantSeed(tile, tileSize));
        this.tileSprites[y][x] = tile;
        graphics.strokeRect(posX, posY, tileSize, tileSize);
      }
    }

    // --- Frame ---
    this.add.rectangle(0, 0, frameThicknessSide, height, frameColor).setOrigin(0); // kiri
    this.add.rectangle(width - frameThicknessSide, 0, frameThicknessSide, height, frameColor).setOrigin(0); // kanan
    this.add.rectangle(frameThicknessSide, 0, width - frameThicknessSide*2, frameHeightTop, frameColor).setOrigin(0); // atas
    this.add.rectangle(frameThicknessSide, height - frameHeightBottom, width - frameThicknessSide*2, frameHeightBottom, frameColor).setOrigin(0); // bawah

    // --- Jam realtime kiri atas ---
    const timeText = this.add.text(frameThicknessSide + 5, frameHeightTop/2, '', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color: '#fff',
      stroke: '#6b4f2c',
      strokeThickness: 2
    }).setOrigin(0,0.5);

    // --- Season kanan atas ---
    this.seasonImage = this.add.image(width - frameThicknessSide - 40, frameHeightTop/2, 'Spring')
      .setOrigin(0.5,0.5)
      .setDisplaySize(30,30);

    this.seasonText = this.add.text(width - frameThicknessSide - 10, frameHeightTop/2, 'Spring', {
      fontFamily: 'Arial',
      fontSize: '14px',
      color:'#fff',
      stroke:'#6b4f2c',
      strokeThickness: 2
    }).setOrigin(0,0.5);

    this.updateSeason(); // set season pertama

    // --- Update clock & season setiap detik ---
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
        this.updateSeason();
      }
    });

    // --- Store & Storage buttons ---
    const storeBtn = this.add.image(width/2 + 40, height - frameHeightBottom/2, 'storeBtn')
      .setDisplaySize(50,50).setOrigin(0.5).setInteractive({useHandCursor:true});

    const storageBtn = this.add.image(width/2 - 40, height - frameHeightBottom/2, 'storageBtn')
      .setDisplaySize(50,50).setOrigin(0.5).setInteractive({useHandCursor:true});

    storeBtn.on('pointerdown', () => { if(!this.storeOpen) this.openStoreMenu(); });
    storageBtn.on('pointerdown', () => { if(!this.storageOpen) this.openStorageMenu(); });

    // --- Setup player storage jika baru ---
    if(Object.keys(this.playerStorage).length===0){
      const seeds = ['Carrot','Corn','Chili','Cabbage','Strawberry','Pineapple','Watermelon','Orange'];
      seeds.forEach(seed=>{
        this.playerStorage[seed] = Phaser.Math.Between(1,3); // random 1-3 bibit
      });
    }
  }

  updateSeason(){
    const now = new Date();
    const startYear = 2026;
    const startDate = new Date(startYear,0,1); // 1 Jan 2026
    const dayOfYear = Math.floor((now - startDate)/(1000*60*60*24)) + 1;

    const seasonIndex = Math.floor((dayOfYear-1)/5) % 4;
    const seasonName = this.seasons[seasonIndex];

    this.seasonImage.setTexture(seasonName);
    this.seasonText.setText(seasonName);
  }

  plantSeed(tile, tileSize){
    if(tile.texture.key === 'dirt') return; // udah ditanami

    const availableSeeds = Object.keys(this.playerStorage).filter(s => this.playerStorage[s] > 0);
    if(availableSeeds.length === 0) return;

    const seed = availableSeeds[Phaser.Math.Between(0, availableSeeds.length-1)];
    this.playerStorage[seed]--;

    tile.setTexture('dirt');
    tile.setDisplaySize(tileSize, tileSize);

    let baseTime = this.seedGrowTime[seed] || 60;
    switch(this.seasonText.text){
      case 'Summer': baseTime *= 0.8; break;
      case 'Autumn': baseTime *= 1.0; break;
      case 'Winter': baseTime *= 1.5; break;
      case 'Spring': baseTime *= 1.0; break;
    }

    this.time.delayedCall(baseTime*1000, () => {
      console.log(`Tile grown: ${seed} after ${Math.round(baseTime)}s`);
    });
  }

  openStoreMenu(){
    if(this.storeOpen) return;
    this.storeOpen = true;

    const {width, height} = this.scale;
    const bgWidth = width*0.85;
    const bgHeight = height*0.5;

    const bg = this.add.rectangle(width/2, height - bgHeight/2 - 10, bgWidth, bgHeight, 0x654321, 0.95).setOrigin(0.5);
    const title = this.add.text(width/2, height - bgHeight + 20, 'STORE', { fontSize:'20px', fontFamily:'Arial', color:'#fff'}).setOrigin(0.5,0);
    const closeBtn = this.add.text(width/2 + bgWidth/2 - 20, height - bgHeight + 20, 'X', { fontSize:'18px', color:'#fff', backgroundColor:'#8B0000', padding:{x:5,y:2} }).setOrigin(0.5,0).setInteractive();

    closeBtn.on('pointerdown', () => { [bg,title,closeBtn].forEach(e=>e.destroy()); this.storeOpen=false; });
  }

  openStorageMenu(){
    if(this.storageOpen) return;
    this.storageOpen = true;

    const { width, height } = this.scale;
    const bgWidth = width*0.85;
    const bgHeight = height*0.5;

    const bg = this.add.rectangle(width/2, height - bgHeight/2 - 10, bgWidth, bgHeight, 0x444444, 0.95).setOrigin(0.5);
    const title = this.add.text(width/2, height - bgHeight + 20, 'STORAGE', { fontSize:'20px', fontFamily:'Arial', color:'#fff'}).setOrigin(0.5,0);
    const closeBtn = this.add.text(width/2 + bgWidth/2 - 20, height - bgHeight + 20, 'X', { fontSize:'18px', color:'#fff', backgroundColor:'#8B0000', padding:{x:5,y:2} }).setOrigin(0.5,0).setInteractive();

    let rowY = height - bgHeight + 60;
    const colX1 = width/2 - 50;
    const colX2 = width/2 + 50;
    const itemTexts = [];

    Object.keys(this.playerStorage).forEach(item=>{
      const nameText = this.add.text(colX1,rowY,item,{fontSize:'14px',color:'#fff'}).setOrigin(0.5,0);
      const qtyText = this.add.text(colX2,rowY,this.playerStorage[item],{fontSize:'14px',color:'#fff'}).setOrigin(0.5,0);
      itemTexts.push(nameText,qtyText);
      rowY += 20;
    });

    closeBtn.on('pointerdown', () => { [bg,title,closeBtn,...itemTexts].forEach(e=>e.destroy()); this.storageOpen = false; });
  }
}
