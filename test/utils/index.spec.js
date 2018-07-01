/**
 * User: abhijit.baldawa
 */

const
    utils = require('../../server/utils');

describe('Utils testing', function() {

    describe('#stringToLowerCaseWordsArray()', function() {
        it('should convert string to lower case words without punctuations', function() {
            const
                checkLowerCaseRegExp = /[^a-z]/g;
                wordsArr = utils.stringToLowerCaseWordsArray("One's day--my friends, prepare your minds;");

            expect(wordsArr).to.be.a('array');
            expect(wordsArr).to.have.lengthOf(7);

            for( let word of wordsArr ) {
                expect(word.match(checkLowerCaseRegExp)).to.equal(null);
            }
        });
    });

    describe("#isPrimeNumber()", function() {
        it("should return true if the number is prime number", function() {
            expect(utils.isPrimeNumber(19)).to.equal(true);
        });

        it("should return false if the number is not a prime number", function() {
            expect(utils.isPrimeNumber(91)).to.equal(false);
        });
    });

    describe("#formatPromiseResult()", function() {
       it("For rejected promise, should resolve successfully to array containing 1 element which would be error from passed in promise", async function() {
           const outputArr = await utils.formatPromiseResult(
                                      new Promise((resolve, reject) => {
                                          setTimeout(reject, 10, "PROMISE_ERROR");
                                      })
                                   );

           expect(outputArr).to.be.a('array');
           expect(outputArr).to.have.lengthOf(1);
           expect(outputArr[0]).to.equal("PROMISE_ERROR")
       });

        it("For successful promise, should resolve successfully to array containing 2 elements. First element should be null and second element should be result of passed in promise", async function() {
            const outputArr = await utils.formatPromiseResult(
                new Promise((resolve, reject) => {
                    setTimeout(resolve, 10, "PROMISE_RESPONSE");
                })
            );

            expect(outputArr).to.be.a('array');
            expect(outputArr).to.have.lengthOf(2);
            expect(outputArr[0]).to.equal(null);
            expect(outputArr[1]).to.equal("PROMISE_RESPONSE");
        })
    });
});