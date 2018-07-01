/**
 * User: abhijit.baldawa
 *
 * This module exposes REST endpoint for /words URL
 */

const
    readline = require('readline'),
    express = require('express'),
    router = express.Router(),
    services = require('../services'),
    utils = require('../utils'),
    {formatPromiseResult} = utils;

/**
 * REST Endpoint <BASE_URL>/words
 *
 * Based on the passed in 'url' query param, this endpoint queries the 'url' and return the list of unique words along with their total
 * count and whether the count is prime number or not.
 *
 * An example JSON response returned by this endpoint is as below:
 *
 * {
 *    "<word>": {
 *       "count": <Number, total number of times this word has appeared>,
 *       "isPrimeNumber": <Boolean, whether the count is prime number or not>
 *    },
 *    ...
 * }
 *
 */
router.get( '/', async (req, res) => {
    let
        {url} = req.query,
        responseObject = {},
        err,
        result;

    // ------------------ 1. Validation -----------------------------------
    if( !url ) {
        return res.status(400).send(`Missing query param 'url'`);
    }

    if( url.includes("https://") ) {
        return res.status(400).send(`Https URL not supported`);
    }
    // ------------------- 1. END -----------------------------------------


    // ---------------- 2. Get response stream of the 'url' from service ---------
    [err, result] = await formatPromiseResult(
                            services.getResponseStreamFromUrl(url)
                          );

    if( err ) {
        return res.status(500).send(err.message || err);
    }
    // ---------------------- 2. END ---------------------------------------------


    // -------- 3. Read the response stream LINE BY LINE for better memory management and build responseObject with words ------
    /**
     * NOTE: If for every line we require async operation then event-stream (or similar module) node module is better
     * option as you can do below with it:
     *
     * 1] Read one line
     * 2] Pause the stream and do some async operation
     * 3] Resume the stream and move to the next line
     *
     * In this use case async operation is not required per line read so I am using node's inbuild "readline" module so that we
     * do not have to resort to third party npm module. Also, node's inbuild "readline" module has pause/resume functionality but as per
     * node's documentation, calling readlineInterface.pause() does not immediately pause other events (including 'line') from being
     * emitted by the readline.Interface instance. Hence recommended event-stream or similar module for async operation per line.
     *
     * More info: https://nodejs.org/api/readline.html#readline_rl_pause
     */
    await new Promise((resolve, reject) => {
                readline.createInterface({
                    input: result,
                    crlfDelay: Infinity
                })
                .on('line', (line) => {
                    if( line && line.trim() ) {
                        utils.stringToLowerCaseWordsArray(line).forEach((word) => {
                            if( responseObject[word] ) {
                                responseObject[word].count++;
                                responseObject[word].isPrimeNumber = utils.isPrimeNumber(responseObject[word].count);
                            } else {
                                responseObject[word] = {
                                    count: 1,
                                    isPrimeNumber: false
                                }
                            }
                        });
                    }
                })
                .on('close', ()=>{
                    resolve();
                })
            });
    // ----------------------------------- 3. END -----------------------------------------------------------------------------

    res.send(responseObject);

} );

module.exports = router;