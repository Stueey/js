class intro2 extends Phaser.Scene {
  constructor() {
    super({
      key: "intro2",
    });

    // Put global variable here
  }
  preload() {

    this.load.tilemapTiledJSON("world", "assets/mainMap.json");

    //character 
        this.load.atlas('coin','assets/coin.png', 'assets/coin.json')
        //this.load.atlas('dasha','assets/dasha.png', 'assets/dasha.json')
        this.load.atlas('stuey','assets/stuey.png', 'assets/stuey.json')
        //this.load.atlas('zuzu','assets/zuzu.png', 'assets/zuzu.json')
        this.load.atlas('coin2','assets/coin.png', 'assets/coin.json')

    // Step 2 : Preload any images here, nickname, filename
    this.load.image("pipoya", "assets/[Base]BaseChip_pipo.png");
    this.load.image("village", "assets/Serene_Village_32x32.png");
    this.load.image("firstPage", "assets/firstPage.png");
    this.load.image("rules", "assets/rules.png");
    this.load.image("character", "assets/character.png");



  }

  create() {
    console.log("*** intro scene");
    this.add.image(0, 0, 'character').setOrigin(0, 0).setScale(1);

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

    
    // ( 0 = mute to 1 is loudest )
    //this.music = this.sound.add('bgMusic').setVolume(0.3) // 10% volume

    //this.music.play()
    //window.music = this.music

    // Add image and detect spacebar keypress
    //this.add.image(0, 0, 'main').setOrigin(0, 0);

    // Check for spacebar or any key here
    var spaceDown = this.input.keyboard.addKey("SPACE");

    // On spacebar event, call the world scene
    spaceDown.on(
      "down",
      function () {
        console.log("Jump to world scene");
        let playerPos = {};
        playerPos.x = 1125.65;
        playerPos.y = 349.63;
        playerPos.dir = "up";
        this.scene.start("world", { playerPos: playerPos });
      },
      this
    );




    // Create all the game animations here
  }

}