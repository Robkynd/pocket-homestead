import { BootScene } from '../src/scenes/BootScene.js';
import { MenuScene } from '../src/scenes/MenuScene.js';
import { FarmScene } from '../src/scenes/FarmScene.js';

export const gameConfig = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  backgroundColor: '#87CEEB',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [BootScene, MenuScene, FarmScene]
};
