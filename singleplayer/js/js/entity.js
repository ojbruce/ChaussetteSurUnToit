/**
 * Chaussette sur un toit (Socket on a roof)
 * A none game
 *
 *
 * entity.js represents each entity of the game
 *
 * 2014, copyright in the trash
 */

/**
 * The player object
 * @param name {String} the name
 * @param img  {String}	the path to the image
 *
 * @retrun {undefines}
 */
 function Player(name,img) {

   this.name 	= name;
   this.image	= img;
   
   this.life 	= 200;
   this.lvl 	= 1;
   this.force 	= 10;

}


Player.prototype.attack = function(other){

	other.life -= this.force;

}