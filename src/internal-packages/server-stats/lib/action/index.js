const Reflux = require('reflux');

/**
 * The actions used by the server stats components.
 */
const Actions = Reflux.createActions([
  'pollCurrentOp', 'pollTop', 'pollServerStats', 'pause'
]);

module.exports = Actions;