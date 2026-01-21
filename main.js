import { BootScene } from './src/scenes/BootScene.js';
import { MenuScene } from './src/scenes/MenuScene.js';

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  backgroundColor: '#000',
  scene: [BootScene, MenuScene]
};

new Phaser.Game(config);
