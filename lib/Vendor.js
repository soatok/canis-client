const {
    AsymmetricPublicKey
} =  require('dhole-crypto');
const CanisGlobal = require('./Canis/CanisGlobal');

/**
 * Represents a vendor object (publisher namespace)
 *
 * @type {module.Vendor}
 */
module.exports = class Vendor {
    constructor(name) {
        this.name = name;
    }

    /**
     *
     *
     * @param {string} name
     * @return {module.Vendor}
     */
    static byName(name) {
        return CanisGlobal.instance().getVendorByName(name);
    }

    /**
     * Get all of the public keys for this vendor.
     *
     * @return {module.AsymmetricPublicKey[]}
     */
    getPublicKeys() {

    }
};
