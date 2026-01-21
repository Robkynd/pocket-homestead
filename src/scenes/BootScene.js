export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('title', 'assets/ui/title.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}
