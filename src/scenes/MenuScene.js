export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;

    // background image
    this.add.image(width / 2, height / 2, 'title')
      .setDisplaySize(width, height);

    // LOGIN BUTTON
    const loginBtn = this.add.text(
      width / 2,
      height - 100,
      'LOG IN',
      {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#6b4f2c',
        padding: { x: 20, y: 10 }
      }
    ).setOrigin(0.5)
     .setInteractive();

    loginBtn.on('pointerdown', () => {
      this.scene.start('FarmScene');
    });
  }
}
