/**
 * Global Canis settings
 *
 * @type {module.CanisGlobal}
 */
module.exports = class CanisGlobal {

    constructor() {
        this.vendors = {};
        this.packages = {};
    }

    /**
     * Instance method.
     *
     * @returns {module.CanisGlobal}
     */
    static instance() {
        if (typeof this.staticInstance === 'undefined') {
            this.staticInstance = new CanisGlobal();
        }
        return this.staticInstance;
    }

    /**
     * @param {string} name
     */
    getVendorByName(name) {
        if (typeof(this.vendors[name]) !== 'undefined') {
            return this.vendors[name];
        }

        // Fallback to a lookup
    }
};
