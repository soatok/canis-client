const {
    Keyring
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
        this.publicKeys = [];
    }

    /**
     * @param {string} name
     * @return {module.Vendor}
     */
    static byName(name) {
        return CanisGlobal.instance().getVendorByName(name);
    }

    /**
     * Get all of the public keys for this vendor.
     *
     * @param {boolean} forceDownload
     * @return {module.AsymmetricPublicKey[]}
     */
    getPublicKeys(forceDownload = false) {
        if (forceDownload || this.publicKeys.length === 0) {
            // Get non-revoked public keys for this vendor
            let response = CanisGlobal.instance()
                .getServer('default')
                .getVendorPublicKeys(this.name);

            let row;
            let publicKeys = [];
            let keyring = new Keyring();
            for (let i = 0; i < response['public-keys'].length; i++) {
                row = response['public-keys'][i];
                publicKeys.push(
                    keyring.loadAsymmetricPublicKey(row['public-key'])
                );
            }
            this.publicKeys = publicKeys;
        }
        return this.publicKeys;
    }
};
