/**
 * User: abhijit.baldawa
 *
 * This module is used to fetch data from third party resource via HTTP Get call
 */

const
    http = require('http');

/**
 * @method PUBLIC
 *
 * This method returns the response stream by making HTTP GET call to the provided 'url'.
 *
 * @param {String} URL
 * @returns {Promise} If successful resolves with response stream or else rejects with error
 */
function getResponseStreamFromUrl( URL ) {
    return new Promise( (resolve, reject) => {
        if( !URL || typeof URL !== "string" ) {
            return reject( "Missing URL" );
        }

        http.get(URL, (response) => {
            response.setEncoding('utf8');
            resolve(response);
        }).on('error', (err) => {
            reject(err);
        });
    } );
}

module.exports = {
    getResponseStreamFromUrl
};