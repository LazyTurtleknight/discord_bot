// constants for the werewolf game and command
const game = {
  NAME: 'werewolf',
  STATUS: {
    inCreation: 'in creation',
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

module.exports = {game, roles, subcommands};
