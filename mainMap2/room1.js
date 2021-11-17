class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
        this.player = data.player
        this.inventory = data.inventory
    }

    preload() {

// Step 1, load JSON
this.load.tilemapTiledJSON("room1", "assets/room1.json");

// Step 2 : Preload any images here, nickname, filename
this.load.image("pipoya", "assets/[Base]BaseChip_pipo.png");

    }

    create() {
        console.log('*** room1 scene');

 //Step 3 - Create the map from main
 var map = this.make.tilemap({key: 'room1'});

 // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //var village = map.addTilesetImage("village", "village");
    var pipoya = map.addTilesetImage("pipoya", "pipoya");

    // Step 5  Load in layers by layers
    this.floorLayer = map.createLayer("floorLayer", [pipoya], 0, 0);
    this.wallLayer = map.createLayer("wallLayer", [pipoya], 0, 0);
    this.decoLayer = map.createLayer("decoLayer", [pipoya], 0, 0);
    this.bookLayer = map.createLayer("bookLayer", [pipoya], 0, 0);



/// The character
this.player = this.physics.add.sprite(258, 581, 'stuey');
this.player.setScale(1.5).setSize(32, 32);
this.player.setCollideWorldBounds(true);
//enable debug
window.player = this.player;

// camera follow player
this.cameras.main.startFollow(this.player);
this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);//cancel outside black world

// boundary main map
// can't go out of the this.map
this.player.setCollideWorldBounds(true); 
//set the boundaries of our game world
this.physics.world.bounds.width = this.floorLayer.width;
this.physics.world.bounds.height = this.floorLayer.height;
 
this.cursors = this.input.keyboard.createCursorKeys();
}

update() {


//check out room1 
if ( this.player.x > 184 && 
     this,player.x < 313 
    && this.player.y > 608) {
this.world();
    }





  //left, right, up, down
  if (this.cursors.left.isDown) {
    this.player.body.setVelocityX(-200);
    this.player.anims.play("left", true); // walk left
    this.player.flipX = false; // flip the sprite to the left
    //console.log('left');
  } else if (this.cursors.right.isDown) {
    this.player.body.setVelocityX(200);
    this.player.anims.play("right", true);
    this.player.flipX = true; // use the original sprite looking to the right
    //console.log('right');
  } else if (this.cursors.up.isDown) {
    this.player.body.setVelocityY(-200);
    this.player.anims.play("up", true);
    //console.log('up');
  } else if (this.cursors.down.isDown) {
    this.player.body.setVelocityY(200);
    this.player.anims.play("down", true);
    //console.log('down');
  } else {
    this.player.anims.stop();
    this.player.body.setVelocity(0, 0);
  }
 }

  // Function to jump to room1
  world(player, tile) {
    console.log("world function");

    this.scene.start("world");
  }
}
