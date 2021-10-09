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
  villager: 'villager',
  werewolf: 'werewolf',
  whitewolf: 'white wolf',
  mayor: 'mayor',
  hunter: 'hunter',
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
  start: 'startWerewolf',
  join: 'joinWerewolf',
  finishSelection: 'finishRoleSelectionWerewolf',
};

module.exports = {game, roles, subcommands, events};
