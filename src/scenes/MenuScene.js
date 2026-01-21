export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;

    // BACKGROUND IMAGE
    this.add.image(width / 2, height / 2, 'title')
      .setDisplaySize(width, height);

    // BUTTON LOGIN
    const btn = this.add.text(
      width / 2,
      height - 90,
      'LOG IN',
      {
        fontSize: '22px',
        color: '#fff',
        backgroundColor: '#6b4f2c',
        padding: { x: 18, y: 10 }
      }
    )
    .setOrigin(0.5)
    .setInteractive();

    btn.on('pointerdown', () => {
      alert('GAME SEDANG TAHAP BUILD');
      this.scene.start('FarmScene');
    });
  }
}
