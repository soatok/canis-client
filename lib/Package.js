const Platform = require('./Platform');
const Vendor = require('./Vendor');

/**
 * Represents a specific package, for a specific vendor,
 * targeting a specific platform.
 * 
 * i.e. [RPGMakerMV]/[soatok]/[dholecrypto]
 *        platform    vendor    package
 *
 * Updates for each package are {module.PackageVersion}
 *
 * @type {module.Package}
 */
module.exports = class Package {
    /**
     * @param {string} name
     * @param {module.Platform} platform
     * @param {module.Vendor} vendor
     */
    constructor(name, platform, vendor) {
        this.name = name;
        this.platform = platform;
        this.vendor = vendor;
    }

    /**
     *
     * @param platform
     * @param vendor
     * @param pkgName
     * @returns {module.Package}
     */
    static byName(platform, vendor, pkgName) {
        return CanisGlobal.instance().getPackageByName(
            platform,
            vendor,
            pkgName
        );
    }

    /**
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * @return {module.Platform}
     */
    getPlatform() {
        return this.platform;
    }

    getUpdates() {

    }

    /**
     * @return {module.Vendor}
     */
    getVendor() {
        return this.vendor;
    }
};
