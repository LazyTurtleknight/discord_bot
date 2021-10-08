
const {game, roles} = require('./constants.js');

/**
 * Werewolf game container.
 */
class WerewolfGame {
  /**
     * Construct empty game object.
     */
  constructor() {
    this.status = game.STATUS.uninitialized;
  }

  /**
   * Initialize the game object.
   */
  initialize() {
    this.status = game.STATUS.inCreation;
    this.phase = game.PHASE.none;
    this.players = new Set();
    this.roles = new Set();
    this.playerRoles = new Map();
  }

  /**
   * Clear the object's content.
   */
  clear() {
    this.status = game.STATUS.uninitialized;
    this.phase = null;
    this.players = null;
    this.roles = null;
    this.playerRoles = null;
  }
  /**
     * Starts the game.
     */
  start() {
    this.status = game.STATUS.running;
    this.phase = game.PHASE.night;
  }

  /**
     * Adds a player to the game.
     *
     * @param {number} playerId is the discord client id of a player.
     * @param {roles} role is the role of a player.
     */
  addPlayer(playerId) {
    if (!this.players.has(playerId)) {
      this.players.add(playerId);
    }
  }
  /**
     * Remove a player from the game.
     *
     * @param {number} playerId is the discord client id of a player.
     */
  removePlayer(playerId) {
    if (this.player.has(playerId)) {
      this.players.delete(playerId);
    }
  }

  /**
   * Helper function to count the number of players.
   * @return {number} number of players
   */
  getPlayerCount() {
    return this.players.size;
  }

  /**
   * Add a role.
   * @param {roles} role to add.
   */
  addRole(role) {
    this.roles.add(role);
  }

  /**
   * Remove a role.
   * @param {roles} role to add.
   */
  removeRole(role) {
    this.roles.delete(role);
  }

  /**
   * Handle a role.
   * @param {roles} role to add.
   */
  handleRole(role) {
    if (role in this.roles) {
      this.removeRole(role);
    } else {
      this.addRole(role);
    }
  }

  /**
   * Map a player to a role.
   * @param {number} playerId Id of player to assign role to.
   * @param {roles} role to assign to player
   */
  assignRole(playerId, role) {
    if (!(playerId in Object.keys(this.playerRoles))) {
      this.playerRoles.set(playerId, role);
    }
  }
};

const gameInstance = new WerewolfGame();

module.exports = gameInstance;