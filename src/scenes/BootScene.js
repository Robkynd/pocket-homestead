
export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    console.log('BootScene loaded');
    this.scene.start('MenuScene');
  }
}
