export class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Load assets
    this.load.image('logo', 'assets/ui/title.png');
    // Load musik boot
    this.load.audio('bootMusic', 'assets/sound/boot.mp3');
  }

  create() {
    const { width, height } = this.scale;

    // --- Logo ---
    this.add.image(width/2, height/2, 'logo').setOrigin(0.5);

    // --- Play musik ---
    this.sound.play('bootMusic', { loop: true, volume: 0.5 });

    // --- Timer untuk lanjut ke MenuScene ---
    this.time.delayedCall(2000, () => {
      this.scene.start('MenuScene');
    });
  }
}
