class room3 extends Phaser.Scene {

    constructor() {
        super({ key: 'room3' });
        
        // Put global variable here
    }


    init(data) {
      this.playerPos = data.playerPos;
    }

    preload() {

// Step 1, load JSON
this.load.tilemapTiledJSON("room3", "assets/room3.json");
this.load.atlas('zuzu','assets/zuzu.png', 'assets/zuzu.json')
this.load.atlas('dasha','assets/dasha.png', 'assets/dasha.json')
this.load.atlas('coin2','assets/coin.png', 'assets/coin.json')

// Step 2 : Preload any images here, nickname, filename
this.load.image("pipoya", "assets/[Base]BaseChip_pipo.png");
this.load.image("coin", "assets/coin.png");
this.load.image("coinS", "assets/coinS.png");

//sound
this.sound1 = this.sound.add('coinss');
this.sound2 = this.sound.add('losingSound');

    }

    create() {
        console.log('*** room3 scene');

//Step 3 - Create the map from main
var map = this.make.tilemap({key: 'room3'});

// Step 4 Load the game tiles
// 1st parameter is name in Tiled,
// 2nd parameter is key in Preload
//var village = map.addTilesetImage("village", "village");
var pipoya = map.addTilesetImage("pipoya", "pipoya");
var coni2 = map.addTilesetImage("coin","coin2")
var coinS = map.addTilesetImage("coinS","coinS")

// Step 5  Load in layers by layers
this.floorLayer = map.createLayer("floorLayer", [pipoya], 0, 0);
this.wallLayer = map.createLayer("wallLayer", [pipoya], 0, 0);
this.decoLayer = map.createLayer("decoLayer", [pipoya], 0, 0);
this.coinSLayer = map.createLayer("coinSLayer", coinS, 0,0);
this.coinLayer = map.createLayer("coinLayer", coni2, 0,0);


//character animation NPC zuzu
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

//character animation NPC dasha
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
this.physics.add.collider( this.coinSLayer , this.player);

// setTileIndexCallback coin
//collect item (follow the name from tiles)s
//name in tiled (item1) check for the number +1
this.coinLayer.setTileIndexCallback(1065, this.removeItem1, this);
this.coinSLayer.setTileIndexCallback(1069, this.removeItem2, this);


//character NPC zuzu
this.dasha = this.physics.add.sprite(245, 177,'dasha').setScale(1.5).play("dasha");
this.physics.add.collider(this.player, this.dasha);

//character NPC dasha
this.zuzu = this.physics.add.sprite(168, 156,'zuzu').setScale(1.5).play("zuzu");
this.physics.add.collider(this.player, this.zuzu);

//Overlap
this.physics.add.overlap(this.player, this.zuzu, this.zuzuOverlap, null, this);
this.physics.add.overlap(this.player, this.dasha, this.dashaOverlap, null, this);

//coin at the top left wondow
this.coin1 = this.add.sprite(50, 50, "coin").setScrollFactor(0).setVisible(false)

//coin at the top left wondow
this.coin1 = this.add.sprite(50, 50, "coin").setScrollFactor(0).setVisible(false)
this.coin2 = this.add.sprite(100, 50, "coinS").setScrollFactor(0).setVisible(false)



//character move rightLeft
this.time.addEvent({
  delay: 1000,
  callback: this.moveRightLeft,
  callbackScope: this,
  loop: false,
});


//character move updown
this.time.addEvent({
  delay: 1000,
  callback: this.moveDownUp,
  callbackScope: this,
  loop: false,
});


  }

 
zuzuOverlap() {
  console.log(" zuzu overlap player");
  this.sound2.play();
  this.scene.start("GameOver");
}


dashaOverlap() {
  console.log(" dasha overlap player");
  this.scene.start("GameOver");
}

 moveDownUp() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.dasha,
    ease: "Linear",
    loop: -1, // loop forever
    duration: 3100,
    tweens: [
      {
        y: 600,
      },
      {
        y: 177,
      },
    ],
  });
}

moveRightLeft() {
  console.log("moveDownUp");
  this.tweens.timeline({
    targets: this.zuzu,
    loop: -1, // loop forever
    ease: "Linear",
    duration: 2000,
    tweens: [
      {
        x: 500,
      },
      {
        x: 156,
      },
    ],
  });
}



update(){


  //check out room3 
if ( this.player.x > 270.62 
  && this,player.x < 352.33 
  && this.player.y > 620) {
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

 // Function to jump to room3
 world(player, tile) {
  console.log("world function");
  let playerPos = {};
  playerPos.x = 1128.92;
  playerPos.y = 1127.25;
  playerPos.dir = "down";

  this.scene.start("world", { playerPos: playerPos });
 }

 //player touch the item then collet them
 removeItem1(player, tile) {
  this.sound1.play();
  console.log("remove item", tile.index);
  this.coinLayer.removeTileAt(tile.x, tile.y); // remove the item
  this.coin1.setVisible(true);
  return false;
}

removeItem2(player, tile) {
  this.sound1.play();
  console.log("remove item", tile.index);
  this.coinSLayer.removeTileAt(tile.x, tile.y); // remove the item
  this.coin2.setVisible(true);
  return false;
}

}/////////////// end of update ////////////////

