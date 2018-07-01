# Author: Abhijit Baldawa
## book_to_words_tdd
I have developed a node.js http server in TDD style which exposes an endpoint `http://BASE_URL/words?url=<full_url_to_txt_file>`. This endpoint accepts a 'url' query param which MUST BE PASSED with a "http" URL to a textfile (book) and the REST endpoint responds with JSON object as below:<br/>

```javascript
{
  "<word>": {
      "count": <Number, number of times this word has appeared in the book>,
      "isPrimeNumber": <Boolean, whether the count is prime number or not>
   },
   ...
} 
```

## File Structure
1. ./server -> Contains all the node.js server code
2. ./server/config/serverConfig.json -> contains http server configuration.
3. ./server/server.js -> start point of the server code.
4. ./server/services/index.js -> exposes 'getResponseStreamFromUrl' method which would hit a passed in URL and return a response stream
5. ./server/routes/bookWords.js -> exposes `/words?url=<full_url_to_txt_file>` ENDPOINT.
6. ./server/utils/index.js ->  exposes 'formatPromiseResult' method to be used with async/await, 'stringToLowerCaseWordsArray' and 'isPrimeNumber' methods
7. ./test/ -> contains all the test spec files to test ROUTE and utilities (contains total 8 tests)

## npm dependencies
### main dependencies
1. express

### Dev dependencies
1. Mocha
2. Chai
3. Supertest

## How to run
1. git clone the project
2. cd book_to_words_tdd
3. npm i
4. npm start 
5. Go to "http://localhost:3000/words?url=http://www.loyalbooks.com/download/text/Railway-Children-by-E-Nesbit.txt" (to get all the words in the book)
6. To run the tests on the console execute "npm test"

NOTE: The endpoint accepts any http (Not 'https') url and returns with the words count in it as a JSON response.

Tests for utility and REST endpoint is written.

