/**
 * User: abhijit.baldawa
 */

const
    express = require('express'),
    app = express(),
    {formatPromiseResult} = require('./utils'),
    {httpServer} = require('./config/serverConfig'),
    bookWords = require('./routes/bookWords');

/**
 * Immediately invoking async method which does all the standard server startup routine.
 */
(async () =>{
    let
        err,
        result;

    // --------------------- 1. Add all the required express middleware ---------------------
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use( '/words', bookWords );
    // --------------------- 1. END --------------------------------------------------------


    // -------------------- 2. initialize i/o clients (ex. database, redis etc) ----------------
    /**
     * We would generally use this space to initialize DB and other I/O clients to connect to their
     * respective servers. As our use case does not involve any so just keeping this space as place holder
     */
    // -------------------- 2. END --------------------------------------------------------


    // ------------------- 3. Start Http Server -------------------------------------------
    await new Promise((resolve, reject) => {
            app.listen(httpServer.port, () => {
                resolve();
            });
          });
    // -------------------- 3. END -------------------------------------------------------

    console.log(`Server is listening on port = ${httpServer.port}`);
})();