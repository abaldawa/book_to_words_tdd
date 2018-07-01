/**
 * User: abhijit.baldawa
 */

const
    request = require('supertest'),
    {httpServer} = require('../../server/config/serverConfig'),
    URL = 'http://www.loyalbooks.com/download/text/Railway-Children-by-E-Nesbit.txt',
    HTTPS_URL = 'https://www.google.com/';


describe(`GET /words?url=${URL}`, function() {
    let
        wordsObj;

    it('responds with json of words', function() {
        return request(`http://localhost:${httpServer.port}`)
                .get(`/words?url=${URL}`)
                .set('Accept', 'application/json')
                .expect(200)
                .then(response => {
                    expect(response.body).to.be.a('object');
                    wordsObj = response.body;
                });
    });

    it(`Every word inside JSON is an object with 'count' and 'isPrimeNumber' set`, function() {
        for( let [wordStr, wordObj] of Object.entries(wordsObj) ) {
            expect(wordStr).to.be.a('string');
            expect(wordObj).to.be.a('object');
            expect(wordObj.count).to.be.a('number');
            expect(wordObj.isPrimeNumber).to.be.a('boolean');
        }
    });

    it(`For https 'url' query param, endpoint responds with not supported and 400 status`, function() {
        return request(`http://localhost:${httpServer.port}`)
            .get(`/words?url=${HTTPS_URL}`)
            .expect(400)
            .then(response => {
                expect(response.error.text).to.be.a('string');
            });
    })
});