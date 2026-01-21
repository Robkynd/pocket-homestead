export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    this.add.text(40, 200, 'MENU OK - TAP TO START', {
      fontSize: '18px',
      color: '#000'
    });

    this.input.once('pointerdown', () => {
      console.log('tap works');
    });
  }
}
