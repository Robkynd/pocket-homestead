export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    console.log('MenuScene loaded');

    // background
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x87ceeb).setOrigin(0);

    // title
    this.add.text(this.scale.width / 2, 120, 'POCKET HOMESTEAD', { fontSize: '24px', color: '#000' }).setOrigin(0.5);

    // start
    const startText = this.add.text(this.scale.width / 2, 220, 'TAP TO START', { fontSize: '18px', color: '#000' }).setOrigin(0.5);
    startText.setInteractive({ useHandCursor: true });

    startText.on('pointerdown', () => {
      console.log('TAP TO START clicked');
      this.scene.start('FarmScene');
    });
  }
}
