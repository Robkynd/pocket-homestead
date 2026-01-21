export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const text = this.add.text(
      40,
      200,
      'MENU OK\nTAP TO START',
      {
        fontSize: '20px',
        color: '#000',
        align: 'center'
      }
    );

    // INI KUNCI NYA
    text.setInteractive();

    text.on('pointerdown', () => {
      alert('TAP MASUK!');
      // nanti: this.scene.start('FarmScene');
    });
  }
}
