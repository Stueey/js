class room1 extends Phaser.Scene {

    constructor() {
        super({ key: 'room1' });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {

// Step 1, load JSON
this.load.tilemapTiledJSON("room1", "assets/room1.json");
this.load.atlas('dasha','assets/dasha.png', 'assets/dasha.json')
//this.load.atlas('coin','assets/coin.png', 'assets/coin.json')
this.load.atlas('coin2','assets/coin.png', 'assets/coin.json')

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
    var coni2 = map.addTilesetImage("coin","coin2")

    // Step 5  Load in layers by layers
    this.floorLayer = map.createLayer("floorLayer", [pipoya], 0, 0);
    this.wallLayer = map.createLayer("wallLayer", [pipoya], 0, 0);
    this.decoLayer = map.createLayer("decoLayer", [pipoya], 0, 0);
    this.bookLayer = map.createLayer("bookLayer", [pipoya], 0, 0);
    this.coinLayer = map.createLayer("coinLayer", coni2, 0,0);

//character animation
this.anims.create({
  key: 'dasha',
  frames:[
      {key:'dasha', frame: 'dashaDown1.png'},
       {key:'dasha', frame: 'dashaDown2.png'},
       {key:'dasha', frame: 'dashaDown3.png'},
      // {key:'dasha', frame: 'dashaLeft1.png'},
      // {key:'dasha', frame: 'dashaLeft2.png'},
      // {key:'dasha', frame: 'dashaLeft3.png'},
      // {key:'dasha', frame: 'dashaRight1.png'},
      // {key:'dasha', frame: 'dashaRight2.png'},
      // {key:'dasha', frame: 'dashaRight3.png'},
      {key:'dasha', frame: 'dashaUp1.png'},
       {key:'dasha', frame: 'dashaUp2.png'},
       {key:'dasha', frame: 'dashaUp3.png'},
      
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
this.player.setScale(1.5).setSize(32, 32).play('up')
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

// //load object COin
// var Coin1 = map.findObject("ObjectLayer1", (obj) => obj.name === "coin1");
// var Coin2 = map.findObject("ObjectLayer1", (obj) => obj.name === "coin2");
// var Coin3 = map.findObject("ObjectLayer1", (obj) => obj.name === "coin3");

//this.enemy = this.physics.add.sprite(120, 134, "coin").play("coins");
// this.enemy = this.physics.add.sprite(Coin2.x, Coin2.y, "coin").play("coins");
// this.enemy = this.physics.add.sprite(Coin3.x, Coin3.y, "coin").play("coins");

//Block the player(collide with this layer)
this.wallLayer.setCollisionByProperty({WallWall: true});
this.decoLayer.setCollisionByProperty({libraryWall: true, deskWall: true});
this.physics.add.collider( this.wallLayer , this.player);
this.physics.add.collider( this.decoLayer , this.player);
this.physics.add.collider( this.coinLayer , this.player);


// setTileIndexCallback coin
//collect item (follow the name from tiles)
//name in tiled (item1) check for the number +1
this.coinLayer.setTileIndexCallback(1065, this.removeItem, this);


//character NPC
this.dasha = this.physics.add.sprite(178, 177,'dasha').setScale(1.5).play("dasha");
this.physics.add.collider(this.player, this.dasha);

this.physics.add.overlap(this.player, this.dasha, this.dashaOverlap, null, this);




//character move updown
this.time.addEvent({
  delay: 1000,
  callback: this.moveDownUp,
  callbackScope: this,
  loop: false,
});


}/////////////// end of update ////////////////


dashaOverlap() {
  console.log(" dasha overlap player");
  this.scene.start("main");
}

 moveDownUp() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.dasha,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 4000,
    tweens: [
      {
        y: 500,
      },
      {
        y: 155,
      },
    ],
  });
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

  // Function to jump to room1
  world(player, tile) {
    console.log("world function");
    let playerPos = {};
    playerPos.x = 685;
    playerPos.y = 139;
    playerPos.dir = "down";

    this.scene.start("world", { playerPos: playerPos });
  }

  //player touch the item then collet them
removeItem(player, tile) {
  console.log("remove item", tile.index);
  this.coinLayer.removeTileAt(tile.x, tile.y); // remove the item
  return false;
}
 
}
