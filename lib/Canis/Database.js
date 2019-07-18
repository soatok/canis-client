const sqlite3 = require('sqlite3').verbose();

/**
 * Easier-to-use database wrapper
 *
 * @type {module.Database}
 */
module.exports = class Database {
    constructor() {
        this.sqlite = sqlite3.Database(__dirname + "/../../canis.db");
    }

    /**
     *
     * @param queryString
     * @returns {*}
     */
    exec(queryString) {
        return this.sqlite.exec(queryString);
    }

    /**
     * Run a query, fetch a single row
     *
     * @param {string} queryString
     * @param {Array} params
     * @returns {Array}
     */
    row(queryString, params = []) {
        let stmt = this.sqlite.prepare(queryString);
        let result = [];
        stmt.get(params, (err, row) => {
            result = row;
        });
        stmt.finalize();
        return result;
    }

    /**
     * Run a query, fetch all the rows
     *
     * @param queryString
     * @param params
     * @returns {Array}
     */
    run(queryString, params = []) {
        let stmt = this.sqlite.prepare(queryString);
        let results = [];
        stmt.each(params, (err, row) => {
            results.push(row);
        });
        stmt.finalize();
        return results;
    }
};
