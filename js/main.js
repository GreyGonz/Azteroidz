var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
  game.load.image('diamond', 'assets/diamond.png');
  game.load.image('shot', 'assets/shot.png');
}

var player;
var shots;
var cursors;
var spaceKey;

var fireRate = 100;
var nextFire = 0;

var ROTATION_SPEED = 200;
var ACCELERATION = 20000;

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#313131';

  player = game.add.sprite(200, 200, 'diamond');
  player.anchor.set(0.5);

  game.physics.enable(player, Phaser.Physics.ARCADE);

  player.body.drag.set(100);
  player.body.maxVelocity.set(200);

  player.body.collideWorldBounds = true;

  shots = game.add.group();
  shots.enableBody = true;
  shots.physicsBodyType = Phaser.Physics.ARCADE;

  shots.createMultiple(50, 'shot');
  shots.setAll('checkWorldBounds', true);
  shots.setAll('outOfBoundsKill', true);

  shots.setAll('anchor.x', 0.5);
  shots.setAll('anchor.y', 0.5);

  // Moviment fletxes
  cursors = game.input.keyboard.createCursorKeys();

  // Espai
  this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
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

  if (this.spaceKey.isDown) {
    fire();
  }

}

function fire() {
  if (game.time.now > nextFire && shots.countDead() > 0) {
    nextFire = game.time.now + fireRate;
    var shot = shots.getFirstDead();
    shot.reset(player.x - 8, player.y - 8);
    game.physics.arcade.velocityFromAngle(player.angle, 300, shot.body.velocity);
  }
}

function render() {

    game.debug.text('Active Bullets: ' + shots.countLiving() + ' / ' + shots.total, 32, 32);
    game.debug.text('Killed Bullets: ' + shots.countDead(), 32, 64);
    game.debug.spriteInfo(player, 32, 450);

}
