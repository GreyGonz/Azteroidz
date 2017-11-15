var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('diamond', 'assets/diamond.png')
}

var player;
var cursors;

var ROTATION_SPEED = 200;
var ACCELERATION = 20000;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  player = game.add.sprite(200, 200, 'diamond');
  player.anchor.set(0.5);

  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.drag.set(100);
  player.body.maxVelocity.set(200);

  player.body.collideWorldBounds = true;

  cursors = game.input.keyboard.createCursorKeys();
}

function update() {

  player.body.angularAcceleration = 0;

  if (cursors.up.isDown) {
    game.physics.arcade.accelerationFromRotation(player.rotation, 200, player.body.acceleration);
  } else {
    player.body.acceleration.set(0);
  }

  if(cursors.left.isDown) {
    player.body.angularVelocity = -200;
  } else if (cursors.right.isDown) {
    player.body.angularVelocity = 200;
  } else {
    player.body.angularVelocity = 0;
  }

  // player.body.velocity.x = 0;
  // player.body.velocity.y = 0;
  // player.body.angularAcceleration = 0;
  //
  // if (cursors.left.isDown) {
  //   player.body.angularAcceleration = -ROTATION_SPEED;
  // } else if (cursors.right.isDown) {
  //   player.body.angularAcceleration = ROTATION_SPEED;
  // }
  //
  // if (cursors.up.isDown) {
  //   player.body.acceleration.x = Math.cos(player.rotation) * ACCELERATION;
  //   player.body.acceleration.y = Math.sin(player.rotation) * ACCELERATION;
  // } else {
  //   player.body.acceleration.x = -1;
  //   player.body.acceleration.y = -1;
  // }

  // if (cursors.up.isDown) {
  //   game.physics.arcade.velocityFromAngle(player.angle, 300, player.body.velocity);
  // }
}
