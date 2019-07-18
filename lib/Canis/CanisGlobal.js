const Database = require('./Database');
const Server = require('../Server');

const Package = require('../Package');
const Vendor = require('../Vendor');
/**
 * Global Canis settings
 *
 * @type {module.CanisGlobal}
 * @property {module.Database} database
 */
module.exports = class CanisGlobal {

    constructor() {
        this.database = new Database();
        this.servers = {};
        this.packages = {};
        this.platforms = {};
        this.vendors = {};
    }

    /**
     * @returns {module.Database}
     */
    db() {
        return this.database;
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
     *
     * @param {string} name
     * @returns {module.Server}
     */
    getServer(name) {
        if (typeof this.servers[name] === 'undefined') {
            throw new Error("Server not configured: " + name);
        }
        return this.servers[name];
    }

    /**
     * @param {string} platformName
     * @param {string} vendorName
     * @param {string} packageName
     * @return {module.Package}
     */
    getPackageByName(platformName, vendorName, packageName) {
        let name = platformName + "/" + vendorName + "/" + packageName;
        if (typeof (this.packages[name]) !== 'undefined') {
            return this.packages[name];
        }

        let platform = this.getPlatformByName(platformName);
        let vendor = this.getVendorByName(vendorName);

        let pkg = this.database.row(
            "SELECT * FROM canis_packages WHERE platform = ? AND vendor = ? AND package = ?",
            [platformName, vendorName, packageName]
        );
        if (typeof(pkg['name']) === 'undefined') {
            // We need to fetch it from the server
            pkg = this.getServer('default').getPackage(vendorName, packageName);

            // Insert into database
            this.database.run(
                "INSERT INTO canis_packages (name, platform, vendor) VALUES (?, ?, ?)",
                [pkg.name, platformName, vendorName]
            );
        }
        // Persist for subsequent calls
        this.packages[name] = new Package(pkg.name, platform, vendor);
        return this.packages[name];
    }

    /**
     * Gets the Platform object by the platform name.
     *
     * Update this whenever we add support for new types of platforms.
     *
     * @param {string} name
     * @returns {module.Platform}
     */
    getPlatformByName(name) {
        if (typeof(this.platforms[name]) !== 'undefined') {
            return this.platforms[name];
        }
        switch (name) {
            case 'COrCPlusPlus':
                this.platforms[name] = require('../Platform/COrCPlusPlus');
                return this.platforms[name];
            case 'GameMaker1':
                this.platforms[name] = require('../Platform/GameMaker1');
                return this.platforms[name];
            case 'GameMaker2':
                this.platforms[name] = require('../Platform/GameMaker2');
                return this.platforms[name];
            case 'RPGMakerMV':
                this.platforms[name] = require('../Platform/RPGMakerMV');
                return this.platforms[name];
            case 'RPGMakerVX':
                this.platforms[name] = require('../Platform/RPGMakerVX');
                return this.platforms[name];
            default:
                this.platforms[name] = require('../Platform/Generic');
                return this.platforms[name];
        }
    }

    /**
     * @param {string} name
     * @return {module.Vendor}
     */
    getVendorByName(name) {
        if (typeof(this.vendors[name]) !== 'undefined') {
            return this.vendors[name];
        }

        // Fallback to a database lookup
        let vendor = this.database.row(
            "SELECT * FROM canis_vendors WHERE name = ?",
            [name]
        );
        if (typeof(vendor['name']) === 'undefined') {
            // We need to fetch it from the server
            vendor = this.getServer('default').getVendor(name);

            // Insert into database
            this.database.run(
                "INSERT INTO canis_vendors (name) VALUES (?)",
                [vendor.name]
            );
        }
        // Persist for subsequent calls
        this.vendors[name] = new Vendor(name);
        return this.vendors[name];
    }

    /**
     * @param {string} name
     * @param {string} url
     */
    setServer(name, url) {
        this.servers[name] = new Server(url);
    }
};
