const UpdateHook = require('../UpdateHook');

/**
 * Update hooks for C/C++ projects
 *
 * Mostly involves copying the newer .dll or .so files to an appropriate
 * location (with rollback).
 *
 * @type {module.COrCPlusPlusUpdateHook}
 */
module.exports = class COrCPlusPlusUpdateHook extends UpdateHook {

};
