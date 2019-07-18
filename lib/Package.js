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
     * @return {module.Platform}
     */
    getPlatform() {

    }

    /**
     * @return {module.Vendor}
     */
    getVendor() {

    }
};
