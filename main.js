console.log('MAIN JS LOADED');

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  backgroundColor: '#87ceeb',
  scene: {
    create() {
      this.add.text(50, 100, 'PHASER OK', {
        color: '#000'
      });
    }
  }
};

new Phaser.Game(config);
