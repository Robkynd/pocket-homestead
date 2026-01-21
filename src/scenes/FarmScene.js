export default class FarmScene extends Phaser.Scene {
  constructor() {
    super('FarmScene');
  }

  create() {
    console.log('FarmScene loaded');

    // background hijau ladang
    this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x00ff00).setOrigin(0);

    // teks debug
    this.add.text(20, 20, 'FARM SCENE OK', { color: '#000' });
  }
}
