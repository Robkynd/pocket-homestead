import BootScene from './scenes/BootScene.js';
import MenuScene from './scenes/MenuScene.js';
import FarmScene from './scenes/FarmScene.js';

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
