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
  villager: {
    name: 'Villager',
    fraction: 'village',
  },
  werewolf: {
    name: 'Werewolf',
    fraction: 'werewolf',
  },
  doppelganger: {
    name: 'Doppelganger',
    fraction: 'village',
  },
  mayor: {
    name: 'Mayor',
    fraction: 'village',
  },
  hunter: {
    name: 'Hunter',
    fraction: 'village',
  },
};

const subcommands = {
  info: 'info',
  create: 'create',
  end: 'end',
};

const events = {
  selectRoles: 'selectRolesWerewolf',
  startRoleSelection: 'startRoleSelection',
  start: 'startWerewolf',
  join: 'joinWerewolf',
  finishSelection: 'finishRoleSelectionWerewolf',
};

module.exports = {game, roles, subcommands, events};
