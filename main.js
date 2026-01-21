import { BootScene } from './src/scenes/BootScene.js';
import { MenuScene } from './src/scenes/MenuScene.js';
import { FarmScene } from './src/scenes/FarmScene.js'; // huruf besar F dan S

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: '#000',
  scene: [BootScene, MenuScene, FarmScene] // harus sama dengan import
};

new Phaser.Game(config);
