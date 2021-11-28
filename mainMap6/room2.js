class room2 extends Phaser.Scene {

    constructor() {
        super({ key: 'room2' });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {

// Step 1, load JSON
this.load.tilemapTiledJSON("room2", "assets/room2.json");
this.load.atlas('zuzu','assets/zuzu.png', 'assets/zuzu.json')
this.load.atlas('coin2','assets/coin.png', 'assets/coin.json')

// Step 2 : Preload any images here, nickname, filename
this.load.image("pipoya", "assets/[Base]BaseChip_pipo.png");
    }

    create() {
        console.log('*** room2 scene');

 //Step 3 - Create the map from main
 var map = this.make.tilemap({key: 'room2'});

 // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    //var village = map.addTilesetImage("village", "village");
    var pipoya = map.addTilesetImage("pipoya", "pipoya");
    var coni2 = map.addTilesetImage("coin","coin2")

    // Step 5  Load in layers by layers
    this.floorLayer = map.createLayer("floorLayer", [pipoya], 0, 0);
    this.wallLayer = map.createLayer("wallLayer", [pipoya], 0, 0);
    this.decoLayer = map.createLayer("decoLayer", [pipoya], 0, 0);
    this.foodUpperLayer = map.createLayer("foodUpperLayer", [pipoya], 0, 0);
    this.coinLayer = map.createLayer("coinLayer", coni2, 0,0);

    //character animation NPC
    this.anims.create({
      key: 'zuzu',
      frames:[
          // {key:'zuzu', frame: 'zuzuDown1.png'},
          // {key:'zuzu', frame: 'zuzuDown2.png'},
          // {key:'zuzu', frame: 'zuzuDown3.png'},
          {key:'zuzu', frame: 'zuzuLeft1.png'},
          {key:'zuzu', frame: 'zuzuLeft2.png'},
          {key:'zuzu', frame: 'zuzuLeft3.png'},
          {key:'zuzu', frame: 'zuzuRight1.png'},
          {key:'zuzu', frame: 'zuzuRight2.png'},
          {key:'zuzu', frame: 'zuzuRight3.png'},
          // {key:'zuzu', frame: 'zuzuUp1.png'},
          // {key:'zuzu', frame: 'szuzuUp2.png'},
          // {key:'zuzu', frame: 'zuzuUp3.png'},
          
      ],
      frameRate:3,
      repeat:-1,
  })

  this.anims.create({
    key: 'coins',
    frames:[
        {key:'coin', frame: 'coin(1).png'},
        {key:'coin', frame: 'coin(2).png'},
        {key:'coin', frame: 'coin(3).png'},
        {key:'coin', frame: 'coin(4).png'},
    ],
    frameRate:10,
    repeat:-1,
  })

  /// The character
this.player = this.physics.add.sprite(
  this.playerPos.x,
  this.playerPos.y,
  this.playerPos.dir
);
this.player.setScale(1.2).setSize(25, 32).play('up')
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
this.physics.world.bounds.width = this.wallLayer.width;
this.physics.world.bounds.height = this.wallLayer.height;
 
this.cursors = this.input.keyboard.createCursorKeys();


//Block the player(collide with this layer)
this.wallLayer.setCollisionByProperty({WallWall: true});
this.decoLayer.setCollisionByProperty({libraryWall: true, deskWall2: true,  decoWall: true});
this.physics.add.collider( this.wallLayer , this.player);
this.physics.add.collider( this.decoLayer , this.player);
this.physics.add.collider( this.coinLayer , this.player);


//collect coin
//setTileIndexCallback
//collect item (follow the name from tiles)
//name in tiled (item1) check for the number +1
this.coinLayer.setTileIndexCallback(1065, this.removeItem, this);



//character NPC
this.zuzu = this.physics.add.sprite(135, 201,'zuzu').setScale(1.5).play("zuzu");

this.physics.add.overlap(this.player, this.zuzu, this.zuzuOverlap, null, this);



this.time.addEvent({
  delay: 1000,
  callback: this.moveRightLeft,
  callbackScope: this,
  loop: false,
});
 



}/////////////// end of update ////////////////




moveRightLeft() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.zuzu,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 2000,
    tweens: [
      {
        x: 600,
      },
      {
        x: 196,
      },
    ],
  });
}



update() {

  //check out room2 
if ( this.player.x > 289.44 
&& this,player.x < 417.10 
&& this.player.y > 607) {
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
    this.player.anims.play("left", true);
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

 // Function to jump to room2
 world(player, tile) {
  console.log("world function");
  let playerPos = {};
  playerPos.x = 355;
  playerPos.y = 710;
  playerPos.dir = "down";

  this.scene.start("world", { playerPos: playerPos });
 }

 zuzuOverlap() {
  console.log(" zuzu overlap player");
  this.scene.start("main");
}

//player touch the item then collet them
removeItem(player, tile) {
  console.log("remove item", tile.index);
  this.coinLayer.removeTileAt(tile.x, tile.y); // remove the item
  return false;
}
  
}
