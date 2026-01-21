import BootScene from './src/scenes/BootScene.js';
import MenuScene from './src/scenes/MenuScene.js';
import FarmScene from './src/scenes/FarmScene.js';

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, MenuScene, FarmScene]
};

new Phaser.Game(config);

console.log('Main.js loaded + scenes imported');
