const fs = require('fs');
const fsp = fs.promises;

const Package = require('./Package');
const Vendor = require('./Vendor');

/**
 * ConfigParser -- for canis.json in each project
 *
 * @type {module.ConfigParser}
 */
module.exports = class ConfigParser {
    constructor(path) {
        this.config = JSON.parse(
            fs.readFileSync(path).toString('UTF-8')
        );
    }

    /**
     * @returns {string}
     */
    getProjectName()
    {
        if (typeof this.config['name'] === "undefined") {
            return "";
        }
        return this.config['name'];
    }

    /**
     * @returns {array}
     */
    getChannels()
    {
        if (typeof this.config['channels'] === "undefined") {
            return [];
        }
        return this.config['channels'];
    }

    getDependencies()
    {
        let deps = this.getDependencies();
        let ret = [];
        let dep;
        for (let i = 0; i < deps.length; i++) {
            dep = deps[i];
            ret.push(
                new Package(
                    dep.package,
                    Vendor.byName(dep.vendor),

                )
            );
        }
    }

    /**
     * @returns {array}
     */
    getNakedDependencies() {
        if (typeof this.config['dependencies'] === "undefined") {
            return [];
        }
        return this.config['dependencies'];
    }
};
