class winScene extends Phaser.Scene {

  constructor ()
  {
      super({ key: 'winScene' });
  }

  preload() {
     
      this.load.image('win', 'assets/winScene.png')

  }
  create () {

      this.add.image(0, 0, 'win').setOrigin(0, 0).setScale(1);

      console.log("world")


      var spaceDown = this.input.keyboard.addKey('SPACE');

      spaceDown.on('down', function(){
          this.scene.start("world");
          }, this );

  }

}