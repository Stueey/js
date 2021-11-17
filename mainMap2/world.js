class world extends Phaser.Scene {
  constructor() {
    super({
      key: "world",
    });
  }

  // incoming data from scene below
  init(data) {
  }

  preload() {
    // Step 1, load JSON
    this.load.tilemapTiledJSON("world", "assets/mainMap.json");

    //character 
        this.load.atlas('coin','assets/coin.png', 'assets/coin.json')
        //this.load.atlas('dasha','assets/dasha.png', 'assets/dasha.json')
        this.load.atlas('stuey','assets/stuey.png', 'assets/stuey.json')
        //this.load.atlas('zuzu','assets/zuzu.png', 'assets/zuzu.json')

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("pipoya", "assets/[Base]BaseChip_pipo.png");
    this.load.image("village", "assets/Serene_Village_32x32.png");
  }

  create() {
    console.log("*** world scene");
    window.map = map;

    //Step 3 - Create the map from main
    var map = this.make.tilemap({key: 'world'});

    // Step 4 Load the game tiles
    // 1st parameter is name in Tiled,
    // 2nd parameter is key in Preload
    var village = map.addTilesetImage("village", "village");
    var pipoya = map.addTilesetImage("pipoya", "pipoya");

    // Step 5  Load in layers by layers
    this.bottomGreenLayer = map.createLayer("bottomGreenLayer", [pipoya, village], 0, 0);
    this.roadSandLayer = map.createLayer("roadSandLayer", [pipoya, village], 0, 0);
    this.bridgeLayer = map.createLayer("bridgeLayer", [pipoya, village], 0, 0);
    this.gardenRockLayer = map.createLayer("gardenRockLayer", [pipoya, village], 0, 0);
    this.tiangLayer = map.createLayer("tiangLayer", [pipoya, village], 0, 0);
    this.treeLayer = map.createLayer("treeLayer", [pipoya, village], 0, 0);
    this.houseLayer = map.createLayer("houseLayer", [pipoya, village], 0, 0);
    this.decoLayer = map.createLayer("decoLayer", [pipoya, village], 0,0);
    


    // Add main player here with physics.add.sprite
    this.anims.create({
      key: 'up',
      frames:[
          {key:'stuey', frame: 'stueyUp1.png'},
          {key:'stuey', frame: 'stueyUp2.png'},
          {key:'stuey', frame: 'stueyUp3.png'},
      ],
      frameRate:10,
      repeat:-1,
  })

  this.anims.create({
    key: 'down',
    frames:[
        {key:'stuey', frame: 'stueyDown1.png'},
        {key:'stuey', frame: 'stueyDown2.png'},
        {key:'stuey', frame: 'stueyDown3.png'},
    ],
    frameRate:10,
    repeat:-1,
})

this.anims.create({
  key: 'left',
  frames:[
      {key:'stuey', frame: 'stueyLeft1.png'},
      {key:'stuey', frame: 'stueyLeft2.png'},
      {key:'stuey', frame: 'stueyLeft3.png'},
  ],
  frameRate:10,
  repeat:-1,
})

this.anims.create({
  key: 'right',
  frames:[
      {key:'stuey', frame: 'stueyRight1.png'},
      {key:'stuey', frame: 'stueyRight2.png'},
      {key:'stuey', frame: 'stueyRight3.png'},
  ],
  frameRate:10,
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
this.player = this.physics.add.sprite(1125.65, 349.63, 'stuey');
//this.player = this.physics.add.sprite(this.playerPos.x, this.playerPos.y, 'stuey');
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
this.physics.world.bounds.width = this.bottomGreenLayer.width;
this.physics.world.bounds.height = this.bottomGreenLayer.height;



//load object
var Start = map.findObject("ObjectLayer1", (obj) => obj.name === "start111");
var Coin1 = map.findObject("ObjectLayer1", (obj) => obj.name === "coin1");
var Coin2 = map.findObject("ObjectLayer1", (obj) => obj.name === "coin2");

this.enemy = this.physics.add.sprite(Coin1.x, Coin1.y, "coin").play("coins");
this.enemy = this.physics.add.sprite(Coin2.x, Coin2.y, "coin").play("coins");



//Block the player(collide with this layer)
this.tiangLayer.setCollisionByProperty({tiangWall: true});
this.treeLayer.setCollisionByProperty({treeWall: true});
this.decoLayer.setCollisionByProperty({WallWall: true, boardWall: true});
this.gardenRockLayer.setCollisionByProperty({gardenRockWall: true});
this.physics.add.collider( this.tiangLayer , this.player);
this.physics.add.collider( this.treeLayer , this.player);
this.physics.add.collider( this.decoLayer , this.player);
this.physics.add.collider( this.gardenRockLayer , this.player);




// // create the arrow keys
this.cursors = this.input.keyboard.createCursorKeys();


  //console.log('idle');
}
// setTileIndexCallback
    //collect item (follow the name from tiles)
    //name in tiled (item1) check for the number +1
    //this.itemLayer.setTileIndexCallback(7, this.removeItem, this);
    //name in tiled (item2)
    //this.itemLayer.setTileIndexCallback(4, this.removeItem, this);

  // Add time event / movement here

  // get the tileIndex number in json, +1
  //mapLayer.setTileIndexCallback(11, this.room1, this);

  // Add custom properties in Tiled called "mouintain" as bool

  // What will collider witg what layers
  //this.physics.add.collider(mapLayer, this.player);

  // create the arrow keys
  //this.cursors = this.input.keyboard.createCursorKeys();


  /////////////////// end of create //////////////////////////////

  update() {/////////////////// end of update //////////////////////////////


//check for BlockA door1
if ( this.player.x > 655 && this,player.x < 723 
  && this.player.y > 91 && this.player.y < 126) {

  this.room1()
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
room1(player, tile) {
  console.log("room1 function");
  this.scene.start("room1")
}



//player touch the item then collet them
removeItem(player, tile) {
  console.log("remove item", tile.index);
  this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
  return false;
}

   //player touch the item then collet them
   removeItem(player, tile) {
    console.log("remove item", tile.index);
    this.itemLayer.removeTileAt(tile.x, tile.y); // remove the item
    return false;
    
  }
} //////////// end of class world ////////////////////////
