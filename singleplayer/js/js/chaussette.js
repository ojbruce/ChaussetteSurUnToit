/**
 * Chaussette sur un toit (Socket on a roof)
 * A none game
 *
 * chaussette.js is the game
 *
 * 2014, copyright in the trash
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'socket', {preload: preload, create: create, update: update});

var socket = new Player('socket', 'assets/socket.png');
var shoe = new Player('shoe', 'assets/shoe.png');

function preload() {

	game.load.image('night', 'assets/night.png');
	game.load.image('roof', 'assets/roof.png');
	game.load.image('fire', 'assets/fire.png');

	game.load.spritesheet(socket.name, socket.image, 99, 85);
	game.load.spritesheet(shoe.name, shoe.image, 99, 85);
}

function create() {

	// Set physics system
	game.physics.startSystem(Phaser.Physics.ARCADE);

	game.add.sprite(0, 0, 'night');
	
	//Le decors
	solid            = game.add.group();
	solid.enableBody = true;

	var roof = solid.create(0, game.world.height - 144, 'roof');
	roof.body.immovable = true;

	var fire = solid.create(game.world.width - 130, game.world.height - 330, 'fire');
	fire.body.immovable = true;
	
	// Creating the socket
	socket = game.add.sprite(670, 0, 'socket');
	game.physics.arcade.enable(socket);
	
	//Creating the shoe
	shoe = game.add.sprite(10, 0, 'shoe');
	game.physics.arcade.enable(shoe);

	//Ajout de la gravite
	socket.body.gravity.y          = 800;
	socket.body.collideWorldBounds = true;
	
	shoe.body.gravity.y          = 1000;
	shoe.body.collideWorldBounds = true;

	//Plop
	socket.name = "socket";
	socket.life = 200;
	shoe.name = "shoe";
	shoe.life = 200;
	
	//Les animations
	socket.animations.add('left' , [0], 10, true);
	socket.animations.add('right', [1], 10, true);
	shoe.animations.add('left' , [0], 10, true);
	shoe.animations.add('right', [1], 10, true);

	cursors = game.input.keyboard.createCursorKeys();
}

/**
 * Function that represents two players collision
 *
 */
function hit(j1, j2){
	console.log(j1.name);	

	j1.life--;
	j2.life--;

	if( j1.life == 0 ){
		console.log("Mort de " + j1.name );
	}

	if( j2.life == 0 ){
		console.log("Mort de " + j2.name );
	}
}


function update() {

	// Collision socket vs roof & qhoe vs roof
	game.physics.arcade.collide(socket, solid);
	game.physics.arcade.collide(shoe, solid);
	
	//Collision with ennemies 
	//game.physics.arcade.collide(shoe, socket, hit);
	game.physics.arcade.collide(socket, shoe, hit);
	
	socket.body.velocity.x = 0;

	if (cursors.left.isDown) {
		socket.body.velocity.x = -300;
		socket.animations.play('left');
	} else if (cursors.right.isDown) {
		socket.body.velocity.x = 300;
		socket.animations.play('right');
	} else {
		socket.animations.stop();
	}

	if (cursors.up.isDown && socket.body.touching.down) {
		socket.body.velocity.y = -600;
	}

	//if(isDown(Phaser.Keyboard.SPACEBAR)){

	//	console.log("yoooo");
	//}
}
