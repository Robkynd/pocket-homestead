export default class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  preload() {
    this.load.image('grass', 'assets/tiles/grass.png');
    this.load.image('farmer', 'assets/player/farmer.png');
  }

  create() {
    // background ladang
    this.add.tileSprite(
      0,
      0,
      this.scale.width,
      this.scale.height,
      'grass'
    ).setOrigin(0);

    // player
    this.player = this.add.image(
      this.scale.width / 2,
      this.scale.height / 2,
      'farmer'
    ).setScale(2);

    // teks debug
    this.add.text(10, 10, 'Farm Scene', {
      fontSize: '16px',
      color: '#ffffff'
    });
  }
}
