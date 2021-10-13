// constants for the werewolf game and command
const game = {
  NAME: 'werewolf',
  STATUS: {
    inCreation: 'in creation',
    inRoleSelection: 'in role selection',
    running: 'running',
    uninitialized: 'uninitialized',
  },
  PHASE: {
    none: 0,
    night: 1,
    day: 2,
    hanging: 3,
  },
};

const roles = {
  villager: 'Villager',
  werewolf: 'Werewolf',
  whitewolf: 'White wolf',
  mayor: 'Mayor',
  hunter: 'Hunter',
};

const subcommands = {
  info: 'info',
  create: 'create',
  join: 'join',
  start: 'start',
  end: 'end',
};

const events = {
  selectRoles: 'selectRolesWerewolf',
  startRoleSelection: 'startRoleSelection',
  start: 'startWerewolf',
  join: 'joinWerewolf',
  finishSelection: 'finishRoleSelectionWerewolf',
  nominate: 'nominate',
  startVote: 'startVote',
  votePlayer: 'votePlayer',
};

module.exports = {game, roles, subcommands, events};
