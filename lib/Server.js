const request = require('request-promise-native');

/**
 * Connects to the Canis Server
 *
 * @type {module.Server}
 */
module.exports = class Server {
    constructor(url) {
        this.url = url;
    }

    async getRequest(path = '/', params={}) {
        return await request({
            'method': 'GET',
            'uri': this.url + path,
            'qs': params
        }).then((body) => {
            if (typeof body === "string") {
                return JSON.parse(body);
            }
            return body;
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    async jsonPostRequest(path = '/', params={}) {
        return await request({
            'method': 'POST',
            'uri': this.url + path,
            'body': params,
            'json': true
        }).then((body) => {
            if (typeof body === "string") {
                return JSON.parse(body);
            }
            return body;
        }).catch((err) => {
            console.log(err);
            return [];
        });
    }

    /**
     * @param {string} vendor
     * @returns {Promise<Array>}
     */
    async getVendorPackages(vendor) {
        let results = await this.getRequest('/api/vendor/packages/' + vendor);
        if (typeof results['packages'] !== 'undefined') {
            return results['packages'];
        }
        return [];
    }

    /**
     * @param {string} vendor
     * @returns {Promise<Array>}
     */
    async getVendorPublicKeys(vendor) {
        let results = await this.getRequest('/api/vendor/keys/' + vendor);
        if (typeof results['packages'] !== 'undefined') {
            return results['packages'];
        }
        return [];
    }
};
