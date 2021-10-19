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
   * Start role selection.
   */
  startRoleSelection() {
    this.roles = new Set();
    this.status = game.STATUS.inRoleSelection;
  }
  /**
   * Starts the game.
   */
  start() {
    this.status = game.STATUS.running;
    this.phase = game.PHASE.night;
    this.assignRoles();
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
   * @return {boolean} indicating if a role was assigned or not
   */
  assignRoleToPlayer(playerId, role) {
    // If a player already has a role, skip assignment.
    if (!this.playerRoles.has(playerId)) {
      this.playerRoles.set(playerId, role);
      return true;
    }
    return false;
  }

  /**
   * Assign roles to players.
   */
  assignRoles() {
    /**
     * First, select werewolfs.
     * Rules:
     * - 1-6 players add 1 werewolf
     * - 7-14 players add 2 werewolfs
     * - 15+ players add 1 werewolf for every 4 players
     */
    // shuffle array of players
    const playerArray = Array.from(this.players).sort(
        (a, b) => 0.5 - Math.random());
    if (this.players.size <= 6) {
      this.assignRoleToPlayer(playerArray[0], roles.werewolf);
    } else if (this.players.size <= 14) {
      this.assignRoleToPlayer(playerArray[0], roles.werewolf);
      this.assignRoleToPlayer(playerArray[1], roles.werewolf);
    } else if (this.players.size > 15) {
      for (let index = 0; index*4 < this.players.size; index++) {
        this.assignRoleToPlayer(playerArray[index], roles.werewolf);
      }
    }

    // Assign roles to player without a role.
    for (const role of this.roles) {
      for (const playerIndex in playerArray) {
        if (this.assignRoleToPlayer(playerArray[playerIndex], role)) {
          break;
        }
      }
    }
    // Player who did not get a role are villagers.
    for (const playerId of this.players) {
      if (!this.playerRoles.has(playerId)) {
        this.playerRoles.set(playerArray, roles.villager);
      }
    }
  }
  /**
   * Fetch all player id with a given role.
   * @param {role} role used to filter for players with that role
   * @return {list} of player ids with that role
   */
  getPlayerWithRole(role) {
    const playersWithRole = [];
    for (const player in Object.keys(this.playerRoles)) {
      if (this.playerRoles[player].name === role) {
        playersWithRole.push(player);
      }
    }
    return playersWithRole;
  }
}

const gameInstance = new WerewolfGame();

module.exports = gameInstance;
