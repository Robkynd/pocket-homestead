window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    width: 360,
    height: 640,
    backgroundColor: '#87CEEB',
    scene: {
      create() {
        this.add.text(50, 50, 'Pocket Homestead OK', {
          fontSize: '20px',
          color: '#000'
        });
      }
    }
  };

  new Phaser.Game(config);
};
