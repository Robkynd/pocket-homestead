export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    this.add.text(60, 100, 'BOOT OK', {
      fontSize: '20px',
      color: '#000'
    });

    this.scene.start('MenuScene');
  }
}
